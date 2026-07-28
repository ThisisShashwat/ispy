import { NextResponse } from 'next/server'
import { getSessionFromRequest } from '../../../lib/auth'
import { getIdentity } from '../../../lib/hackclub'
import { getHackatimeProjects } from '../../../lib/hackatime'
import { findPrize } from '../../../data/prizeTiers'
import {
  AIRTABLE_FIELDS,
  createAirtableRecord,
  deleteAirtableRecord,
  uploadAirtableAttachment,
} from '../../../lib/airtable'

function parseCart(raw) {
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    return null
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null

  const entries = []
  for (const [itemId, quantity] of Object.entries(parsed)) {
    const qty = Number(quantity)
    if (!Number.isInteger(qty) || qty <= 0) return null
    const match = findPrize(itemId)
    if (!match) return null
    entries.push({ itemId, quantity: qty, item: match.item, cost: match.cost })
  }
  return entries
}

function serializeCart(entries) {
  return entries.map(({ item, quantity }) => `${item.name} ×${quantity}`).join(', ')
}

export async function POST(request) {
  const session = await getSessionFromRequest()
  if (!session || !session.hackatime_access_token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const formData = await request.formData()
  const category = formData.get('category')?.toString() ?? ''
  const projectNames = (formData.get('projectName')?.toString() ?? '')
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)
  const journalLink = formData.get('journalLink')?.toString() ?? ''
  const hoursSpentRaw = formData.get('hoursSpent')?.toString() ?? ''
  const cartRaw = formData.get('cart')?.toString() ?? ''
  const playableUrl = formData.get('playableUrl')?.toString() ?? ''
  const codeUrl = formData.get('codeUrl')?.toString() ?? ''
  const description = formData.get('description')?.toString() ?? ''
  const comments = formData.get('comments')?.toString() ?? ''
  const screenshot = formData.get('screenshot')
  // Not available via OAuth scope for this app tier — user-entered.
  const birthday = formData.get('birthday')?.toString() ?? ''
  const githubUsername = formData.get('githubUsername')?.toString() ?? ''
  const addressLine1 = formData.get('addressLine1')?.toString() ?? ''
  const addressLine2 = formData.get('addressLine2')?.toString() ?? ''
  const city = formData.get('city')?.toString() ?? ''
  const state = formData.get('state')?.toString() ?? ''
  const country = formData.get('country')?.toString() ?? ''
  const zip = formData.get('zip')?.toString() ?? ''

  if (category !== 'software' && category !== 'hardware') {
    return NextResponse.json({ error: 'Invalid or missing category' }, { status: 400 })
  }

  // Re-fetch identity and Hackatime data from the session's access token —
  // never trust identity/hours values from the client payload. Hardware
  // submissions have no Hackatime project, so self-reported hours are used
  // as-is; there's no independent source to re-verify them against.
  const [identity, projects] = await Promise.all([
    getIdentity(session.access_token),
    category === 'software' ? getHackatimeProjects(session.hackatime_access_token) : Promise.resolve(null),
  ])

  let selectedProjects = []
  let hoursTracked = 0
  if (category === 'software') {
    selectedProjects = projectNames
      .map((name) => projects.find((p) => p.name === name))
      .filter(Boolean)
    hoursTracked =
      selectedProjects.length === projectNames.length
        ? selectedProjects.reduce((sum, p) => sum + p.total_seconds, 0) / 3600
        : 0
  } else {
    hoursTracked = parseFloat(hoursSpentRaw) || 0
  }

  const cartEntries = parseCart(cartRaw)
  const prizeSummary = cartEntries ? serializeCart(cartEntries) : ''

  const candidateFields = {
    [AIRTABLE_FIELDS.playableUrl]: playableUrl,
    [AIRTABLE_FIELDS.codeUrl]: codeUrl,
    [AIRTABLE_FIELDS.firstName]: identity?.first_name ?? '',
    [AIRTABLE_FIELDS.lastName]: identity?.last_name ?? '',
    [AIRTABLE_FIELDS.email]: identity?.primary_email ?? '',
    [AIRTABLE_FIELDS.description]: description,
    // Trusted from the client, unlike identity/hours above: this is submission
    // attribution only, not auth-bearing, and is deliberately user-correctable
    // since OAuth's cached GitHub username can be stale or never linked.
    [AIRTABLE_FIELDS.githubUsername]: githubUsername,
    [AIRTABLE_FIELDS.addressLine1]: addressLine1,
    [AIRTABLE_FIELDS.addressLine2]: addressLine2,
    [AIRTABLE_FIELDS.city]: city,
    [AIRTABLE_FIELDS.state]: state,
    [AIRTABLE_FIELDS.country]: country,
    [AIRTABLE_FIELDS.zip]: zip,
    [AIRTABLE_FIELDS.birthday]: birthday,
    [AIRTABLE_FIELDS.prize]: prizeSummary,
    [AIRTABLE_FIELDS.category]: category === 'hardware' ? 'Hardware' : 'Software',
  }

  const requiredCheck = {
    'Playable URL': playableUrl,
    'Code URL': codeUrl,
    'First Name': identity?.first_name,
    'Last Name': identity?.last_name,
    Email: identity?.primary_email,
    Screenshot: screenshot,
    Description: description,
    'Address Line 1': addressLine1,
    City: city,
    'State/Province': state,
    Country: country,
    'Zip Code': zip,
    Birthday: birthday,
    Prize: prizeSummary,
  }

  if (category === 'hardware') {
    candidateFields[AIRTABLE_FIELDS.journalLink] = journalLink
    requiredCheck['Journal Link'] = journalLink
    requiredCheck['Hours Spent'] = hoursSpentRaw
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

  if (category === 'software' && (projectNames.length === 0 || selectedProjects.length !== projectNames.length)) {
    return NextResponse.json({ error: 'Selected project not found on Hackatime' }, { status: 400 })
  }

  if (!cartEntries || cartEntries.length === 0) {
    return NextResponse.json({ error: 'No prizes selected' }, { status: 400 })
  }

  const cartTotal = cartEntries.reduce((sum, entry) => sum + entry.cost * entry.quantity, 0)

  if (cartTotal > hoursTracked) {
    const hoursDescription =
      category === 'software'
        ? `"${selectedProjects.map((p) => p.name).join(', ')}" has ${hoursTracked.toFixed(1)} tracked hours`
        : `${hoursTracked.toFixed(1)} self-reported hours`
    return NextResponse.json(
      {
        error: `Not eligible: ${hoursDescription}, this cart costs ${cartTotal.toFixed(1)}.`,
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
