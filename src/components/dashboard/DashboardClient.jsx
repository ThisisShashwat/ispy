'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ProjectPicker from './ProjectPicker'
import PrizePicker from './PrizePicker'
import SubmissionForm from './SubmissionForm'
import { findPrize } from '../../data/prizeTiers'

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
  journalLink: '',
  githubUsername: '',
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

function cartTotal(cart) {
  return Object.entries(cart).reduce((sum, [itemId, quantity]) => {
    const match = findPrize(itemId)
    return sum + (match ? match.cost * quantity : 0)
  }, 0)
}

function validate(fields, cart, hoursTracked, screenshot, category) {
  const errors = {}
  for (const [name, message] of REQUIRED_TEXT_FIELDS) {
    if (!fields[name].trim()) errors[name] = message
  }
  if (category === 'hardware' && !fields.journalLink.trim()) {
    errors.journalLink = 'Journal Link is required'
  }
  if (!screenshot) errors.screenshot = 'Screenshot is required'
  const total = cartTotal(cart)
  if (total === 0) errors.prize = 'Select at least one prize'
  else if (total > hoursTracked) errors.prize = 'Cart total exceeds your available hours'
  return errors
}

export default function DashboardClient({ profile, projects }) {
  const router = useRouter()
  const [showForm, setShowForm] = useState(false)
  const [category, setCategory] = useState(null)
  const [selectedProjects, setSelectedProjects] = useState([])
  const [hoursSpent, setHoursSpent] = useState('')
  const [cart, setCart] = useState({})
  const [fields, setFields] = useState(() => ({
    ...EMPTY_FIELDS,
    githubUsername: profile?.githubUsername ?? '',
  }))
  const [screenshot, setScreenshot] = useState(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const hoursTracked =
    category === 'hardware'
      ? parseFloat(hoursSpent) || 0
      : selectedProjects.reduce((sum, project) => sum + project.total_seconds, 0) / 3600

  const trackIdentified =
    category === 'hardware' ? hoursSpent.trim() !== '' : selectedProjects.length > 0

  function handleSelectCategory(nextCategory) {
    setCategory(nextCategory)
    setSelectedProjects([])
    setHoursSpent('')
    setCart({})
    setErrors({})
  }

  function handleSelectProject(project) {
    setSelectedProjects((prev) =>
      prev.some((p) => p.name === project.name)
        ? prev.filter((p) => p.name !== project.name)
        : [...prev, project],
    )
    setCart({})
  }

  function handleHoursSpentChange(value) {
    setHoursSpent(value)
    setCart({})
  }

  function handleChangeQuantity(itemId, quantity) {
    setCart((prev) => {
      if (quantity <= 0) {
        const { [itemId]: _removed, ...rest } = prev
        return rest
      }
      return { ...prev, [itemId]: quantity }
    })
  }

  function handleFieldChange(name, value) {
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (category === 'software' && selectedProjects.length === 0) {
      setErrors({ project: 'Select a Hackatime project first' })
      return
    }

    if (category === 'hardware' && !hoursSpent.trim()) {
      setErrors({ hours: 'Enter hours spent first' })
      return
    }

    const validationErrors = validate(fields, cart, hoursTracked, screenshot, category)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setStatus('submitting')
    setStatusMessage('')

    const body = new FormData()
    body.set('category', category)
    if (category === 'software') {
      body.set('projectName', selectedProjects.map((p) => p.name).join(', '))
    } else {
      body.set('hoursSpent', hoursSpent)
      body.set('journalLink', fields.journalLink)
    }
    body.set('cart', JSON.stringify(cart))
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
    body.set('githubUsername', fields.githubUsername)
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
      setStatusMessage('Network error. Submission was not sent. Please try again.')
    }
  }

  if (!showForm) {
    return (
      <div className="flex flex-col items-start gap-6">
        <p className="font-data text-[12px] leading-[1.8] text-ink/70">
          {profile?.firstName ? `Welcome, ${profile.firstName}` : 'Welcome'}
        </p>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="bg-ink px-7 py-3.5 font-data text-[11px] font-bold uppercase tracking-[0.12em] text-plate transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Submit a project
        </button>
      </div>
    )
  }

  if (!category) {
    return (
      <div>
        <p className="mb-3 font-data text-[10px] uppercase tracking-[0.18em] text-signal">
          Is this a hardware or software project?
        </p>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleSelectCategory('software')}
            className="border border-ink px-7 py-3.5 font-data text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-plate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Software
          </button>
          <button
            type="button"
            onClick={() => handleSelectCategory('hardware')}
            className="border border-ink px-7 py-3.5 font-data text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-plate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Hardware
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-12">
      <button
        type="button"
        onClick={() => handleSelectCategory(null)}
        className="font-data text-xs text-ink/65 hover:underline self-start"
      >
        ← change category
      </button>

      <div>
        <p className="mb-3 font-data text-[10px] uppercase tracking-[0.18em] text-signal">
          1. {category === 'software' ? "Select the project you're submitting" : 'Enter your self-reported hours spent'}
        </p>
        {category === 'software' ? (
          <>
            <ProjectPicker
              projects={projects}
              selectedProjects={selectedProjects}
              onSelect={handleSelectProject}
            />
            {errors.project && <p className="text-error text-xs mt-2 font-data">{errors.project}</p>}
          </>
        ) : (
          <>
            <input
              type="number"
              min="0"
              step="0.1"
              value={hoursSpent}
              onChange={(e) => handleHoursSpentChange(e.target.value)}
              placeholder="Hours spent"
              className="w-full max-w-xs border border-ink/15 bg-plate px-3 py-2 text-sm text-ink focus:outline-none focus:border-ink"
            />
            {errors.hours && <p className="text-error text-xs mt-2 font-data">{errors.hours}</p>}
          </>
        )}
      </div>

      {trackIdentified && (
        <div>
          <p className="mb-3 font-data text-[10px] uppercase tracking-[0.18em] text-signal">
            2. Pick your prizes (
            {category === 'software'
              ? `${hoursTracked.toFixed(1)} tracked hours on "${selectedProjects.map((p) => p.name).join(', ')}"`
              : `${hoursTracked.toFixed(1)} self-reported hours`}
            )
          </p>
          <PrizePicker
            hoursTracked={hoursTracked}
            cart={cart}
            onChangeQuantity={handleChangeQuantity}
          />
          {errors.prize && <p className="text-error text-xs mt-2 font-data">{errors.prize}</p>}
        </div>
      )}

      {trackIdentified && cartTotal(cart) > 0 && cartTotal(cart) <= hoursTracked && (
        <div>
          <p className="mb-3 font-data text-[10px] uppercase tracking-[0.18em] text-signal">
            3. Submission details
          </p>
          <SubmissionForm
            profile={profile}
            category={category}
            fields={fields}
            onFieldChange={handleFieldChange}
            onScreenshotChange={setScreenshot}
            screenshotName={screenshot?.name}
            errors={errors}
          />

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-8 bg-ink px-7 py-3.5 font-data text-[11px] font-bold uppercase tracking-[0.12em] text-plate transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Submitting…' : 'Submit'}
          </button>

          {statusMessage && (
            <p
              className={`mt-4 font-data text-sm ${status === 'success' ? 'text-signal' : 'text-error'}`}
            >
              {statusMessage}
            </p>
          )}

          {status === 'error' && (
            <p className="mt-2 font-data text-xs text-ink/65">
              Having trouble?{' '}
              <a
                href="https://forms.hackclub.com/t/eRmxM63EgHus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-signal hover:underline"
              >
                Try our backup submission form ↗
              </a>
            </p>
          )}
        </div>
      )}
    </form>
  )
}
