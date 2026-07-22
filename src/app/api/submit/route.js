import { NextResponse } from 'next/server'
import { getSessionFromRequest } from '../../../lib/auth'
import { getIdentity } from '../../../lib/hackclub'
import { getHackatimeMe, getHackatimeProjects } from '../../../lib/hackatime'
import { prizeTiers } from '../../../data/prizeTiers'
import {
  AIRTABLE_FIELDS,
  createAirtableRecord,
  deleteAirtableRecord,
  uploadAirtableAttachment,
} from '../../../lib/airtable'

function findPrize(prizeId) {
  for (const tier of prizeTiers) {
    const item = tier.items.find((i) => i.id === prizeId)
    if (item) return { item, tier }
  }
  return null
}

export async function POST(request) {
  const session = await getSessionFromRequest()
  if (!session || !session.hackatime_access_token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const formData = await request.formData()
  const projectName = formData.get('projectName')?.toString() ?? ''
  const prizeId = formData.get('prizeId')?.toString() ?? ''
  const prizeName = formData.get('prizeName')?.toString() ?? ''
  const playableUrl = formData.get('playableUrl')?.toString() ?? ''
  const codeUrl = formData.get('codeUrl')?.toString() ?? ''
  const description = formData.get('description')?.toString() ?? ''
  const comments = formData.get('comments')?.toString() ?? ''
  const screenshot = formData.get('screenshot')
  // Not available via OAuth scope for this app tier — user-entered.
  const birthday = formData.get('birthday')?.toString() ?? ''
  const addressLine1 = formData.get('addressLine1')?.toString() ?? ''
  const addressLine2 = formData.get('addressLine2')?.toString() ?? ''
  const city = formData.get('city')?.toString() ?? ''
  const state = formData.get('state')?.toString() ?? ''
  const country = formData.get('country')?.toString() ?? ''
  const zip = formData.get('zip')?.toString() ?? ''

  // Re-fetch identity and Hackatime data from the session's access token —
  // never trust identity/hours values from the client payload.
  const [identity, projects, hackatimeMe] = await Promise.all([
    getIdentity(session.access_token),
    getHackatimeProjects(session.hackatime_access_token),
    getHackatimeMe(session.hackatime_access_token),
  ])

  const selectedProject = projects.find((p) => p.name === projectName)
  const hoursTracked = selectedProject ? selectedProject.total_seconds / 3600 : 0

  const prizeMatch = findPrize(prizeId)

  const candidateFields = {
    [AIRTABLE_FIELDS.playableUrl]: playableUrl,
    [AIRTABLE_FIELDS.codeUrl]: codeUrl,
    [AIRTABLE_FIELDS.firstName]: identity?.first_name ?? '',
    [AIRTABLE_FIELDS.lastName]: identity?.last_name ?? '',
    [AIRTABLE_FIELDS.email]: identity?.primary_email ?? '',
    [AIRTABLE_FIELDS.description]: description,
    [AIRTABLE_FIELDS.githubUsername]: hackatimeMe?.github_username ?? '',
    [AIRTABLE_FIELDS.addressLine1]: addressLine1,
    [AIRTABLE_FIELDS.addressLine2]: addressLine2,
    [AIRTABLE_FIELDS.city]: city,
    [AIRTABLE_FIELDS.state]: state,
    [AIRTABLE_FIELDS.country]: country,
    [AIRTABLE_FIELDS.zip]: zip,
    [AIRTABLE_FIELDS.birthday]: birthday,
    [AIRTABLE_FIELDS.prize]: prizeName,
  }

  const requiredCheck = {
    'Playable URL': playableUrl,
    'Code URL': codeUrl,
    'First Name': identity?.first_name,
    'Last Name': identity?.last_name,
    Email: identity?.primary_email,
    Screenshot: screenshot,
    Description: description,
    'Github Username': hackatimeMe?.github_username,
    'Address Line 1': addressLine1,
    City: city,
    'State/Province': state,
    Country: country,
    'Zip Code': zip,
    Birthday: birthday,
    Prize: prizeName,
  }

  const missingFields = Object.entries(requiredCheck)
    .filter(([, value]) => !value || (typeof value === 'string' && !value.trim()))
    .map(([field]) => field)

  if (missingFields.length > 0) {
    return NextResponse.json(
      { error: 'Missing required fields', missingFields },
      { status: 400 },
    )
  }

  if (!selectedProject) {
    return NextResponse.json({ error: 'Selected project not found on Hackatime' }, { status: 400 })
  }

  if (!prizeMatch) {
    return NextResponse.json({ error: 'Unknown prize selected' }, { status: 400 })
  }

  if (hoursTracked < prizeMatch.tier.hours) {
    return NextResponse.json(
      {
        error: `Not eligible: "${selectedProject.name}" has ${hoursTracked.toFixed(1)} tracked hours, this prize requires ${prizeMatch.tier.hours}.`,
      },
      { status: 403 },
    )
  }

  candidateFields[AIRTABLE_FIELDS.overrideHours] = hoursTracked
  if (comments.trim()) {
    candidateFields[AIRTABLE_FIELDS.comments] = comments
  }

  let record
  try {
    record = await createAirtableRecord(candidateFields)
  } catch (err) {
    console.error('[airtable] record creation failed:', err.message)
    return NextResponse.json({ error: 'Failed to create Airtable record' }, { status: 502 })
  }

  try {
    await uploadAirtableAttachment({
      recordId: record.id,
      fieldName: AIRTABLE_FIELDS.screenshot,
      file: screenshot,
    })
  } catch (err) {
    console.error('[airtable] attachment upload failed:', err.message)
    // Don't leave a record behind that's missing a required field.
    await deleteAirtableRecord(record.id)
    return NextResponse.json({ error: 'Screenshot upload failed; submission was not saved' }, { status: 502 })
  }

  return NextResponse.json({ success: true, recordId: record.id })
}
