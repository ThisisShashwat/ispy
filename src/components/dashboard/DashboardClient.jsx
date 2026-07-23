'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProjectPicker from './ProjectPicker'
import PrizePicker from './PrizePicker'
import SubmissionForm from './SubmissionForm'

const EMPTY_FIELDS = {
  playableUrl: '',
  codeUrl: '',
  description: '',
  comments: '',
  birthday: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: '',
  zip: '',
}

const REQUIRED_TEXT_FIELDS = [
  ['playableUrl', 'Playable URL is required'],
  ['codeUrl', 'Code URL is required'],
  ['description', 'Description is required'],
  ['birthday', 'Birthday is required'],
  ['addressLine1', 'Address Line 1 is required'],
  ['city', 'City is required'],
  ['state', 'State/Province is required'],
  ['country', 'Country is required'],
  ['zip', 'Zip Code is required'],
]

function validate(fields, selectedPrize, screenshot) {
  const errors = {}
  for (const [name, message] of REQUIRED_TEXT_FIELDS) {
    if (!fields[name].trim()) errors[name] = message
  }
  if (!screenshot) errors.screenshot = 'Screenshot is required'
  if (!selectedPrize) errors.prize = 'Select a prize you are eligible for'
  return errors
}

export default function DashboardClient({ profile, projects }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedPrize, setSelectedPrize] = useState(null)
  const [fields, setFields] = useState(EMPTY_FIELDS)
  const [screenshot, setScreenshot] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState('')

  const hoursTracked = selectedProject ? selectedProject.total_seconds / 3600 : 0

  function handleSelectProject(project) {
    setSelectedProject(project)
    // Changing the project can invalidate a previously-eligible prize choice.
    setSelectedPrize(null)
  }

  function handleFieldChange(name, value) {
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!selectedProject) {
      setErrors({ project: 'Select a Hackatime project first' })
      return
    }

    const validationErrors = validate(fields, selectedPrize, screenshot)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setStatus('submitting')
    setStatusMessage('')

    const body = new FormData()
    body.set('projectName', selectedProject.name)
    body.set('prizeId', selectedPrize.id)
    body.set('prizeName', selectedPrize.name)
    body.set('playableUrl', fields.playableUrl)
    body.set('codeUrl', fields.codeUrl)
    body.set('description', fields.description)
    body.set('comments', fields.comments)
    body.set('birthday', fields.birthday)
    body.set('addressLine1', fields.addressLine1)
    body.set('addressLine2', fields.addressLine2)
    body.set('city', fields.city)
    body.set('state', fields.state)
    body.set('country', fields.country)
    body.set('zip', fields.zip)
    body.set('screenshot', screenshot)

    try {
      const response = await fetch('/api/submit', { method: 'POST', body })
      const result = await response.json()

      if (!response.ok) {
        setStatus('error')
        setStatusMessage(result.error || 'Submission failed. Please check the form and try again.')
        if (result.missingFields) {
          setErrors(
            Object.fromEntries(result.missingFields.map((field) => [field, 'Required by Airtable'])),
          )
        }
        return
      }

      setStatus('success')
      router.push('/dashboard/success')
    } catch {
      setStatus('error')
      setStatusMessage('Network error — submission was not sent. Please try again.')
    }
  }

  if (!showForm) {
    return (
      <div className="flex flex-col items-start gap-6">
        <p className="text-on-background text-lg">
          {profile?.firstName ? `Welcome, ${profile.firstName}` : 'Welcome'}
        </p>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="font-mono uppercase tracking-widest border border-primary-container text-primary-container px-8 py-4 hover:bg-primary-container hover:text-on-primary-container transition-colors"
        >
          Submit a project
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-12">
      <div>
        <p className="font-mono text-xs text-primary-container tracking-widest uppercase mb-3">
          1. Select the project you're submitting
        </p>
        <ProjectPicker
          projects={projects}
          selectedProject={selectedProject}
          onSelect={handleSelectProject}
        />
        {errors.project && <p className="text-error text-xs mt-2 font-mono">{errors.project}</p>}
      </div>

      {selectedProject && (
        <div>
          <p className="font-mono text-xs text-primary-container tracking-widest uppercase mb-3">
            2. Pick your prize ({hoursTracked.toFixed(1)} tracked hours on "{selectedProject.name}")
          </p>
          <PrizePicker
            hoursTracked={hoursTracked}
            selectedPrize={selectedPrize}
            onSelect={setSelectedPrize}
          />
          {errors.prize && <p className="text-error text-xs mt-2 font-mono">{errors.prize}</p>}
        </div>
      )}

      {selectedProject && selectedPrize && (
        <div>
          <p className="font-mono text-xs text-primary-container tracking-widest uppercase mb-3">
            3. Submission details
          </p>
          <SubmissionForm
            profile={profile}
            fields={fields}
            onFieldChange={handleFieldChange}
            onScreenshotChange={setScreenshot}
            screenshotName={screenshot?.name}
            errors={errors}
          />

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-8 font-mono uppercase tracking-widest border border-primary-container text-primary-container px-8 py-4 hover:bg-primary-container hover:text-on-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Submitting…' : 'Submit'}
          </button>

          {statusMessage && (
            <p
              className={`mt-4 font-mono text-sm ${status === 'success' ? 'text-primary-container' : 'text-error'}`}
            >
              {statusMessage}
            </p>
          )}
        </div>
      )}
    </form>
  )
}
