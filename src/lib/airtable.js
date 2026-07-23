const AIRTABLE_API_BASE = 'https://api.airtable.com/v0'
const AIRTABLE_CONTENT_BASE = 'https://content.airtable.com/v0'

// Confirmed against the live base schema (table "YSWS Project Submission",
// tblj4KuOsDxuR6Fmw) via the Airtable meta API.
export const AIRTABLE_FIELDS = {
  playableUrl: 'Playable URL',
  codeUrl: 'Code URL',
  firstName: 'First Name',
  lastName: 'Last Name',
  email: 'Email',
  screenshot: 'Screenshot',
  description: 'Description',
  githubUsername: 'GitHub Username',
  addressLine1: 'Address (Line 1)',
  addressLine2: 'Address (Line 2)',
  city: 'City',
  state: 'State / Province',
  country: 'Country',
  zip: 'ZIP / Postal Code',
  birthday: 'Birthday',
  prize: 'Prize',
  comments: 'Comments',
  overrideHours: 'Optional - Override Hours Spent',
  category: 'Category',
  journalLink: 'Journal Link',
}

function airtableConfig() {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_TABLE_NAME
  if (!apiKey || !baseId || !tableName) {
    throw new Error('Airtable env vars are not configured')
  }
  return { apiKey, baseId, tableName }
}

export async function createAirtableRecord(fields) {
  const { apiKey, baseId, tableName } = airtableConfig()

  const response = await fetch(`${AIRTABLE_API_BASE}/${baseId}/${encodeURIComponent(tableName)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fields, typecast: false }),
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Airtable record creation failed: ${response.status} ${detail}`)
  }

  return response.json()
}

export async function uploadAirtableAttachment({ recordId, fieldName, file }) {
  const { apiKey, baseId } = airtableConfig()

  const arrayBuffer = await file.arrayBuffer()
  const base64File = Buffer.from(arrayBuffer).toString('base64')

  const response = await fetch(
    `${AIRTABLE_CONTENT_BASE}/${baseId}/${recordId}/${encodeURIComponent(fieldName)}/uploadAttachment`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contentType: file.type || 'application/octet-stream',
        filename: file.name || 'screenshot',
        file: base64File,
      }),
    },
  )

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Airtable attachment upload failed: ${response.status} ${detail}`)
  }

  return response.json()
}

export async function deleteAirtableRecord(recordId) {
  const { apiKey, baseId, tableName } = airtableConfig()
  await fetch(`${AIRTABLE_API_BASE}/${baseId}/${encodeURIComponent(tableName)}/${recordId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${apiKey}` },
  })
}
