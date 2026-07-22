const HACKATIME_BASE = 'https://hackatime.hackclub.com'

// Hackatime is a fully separate OAuth2 provider from auth.hackclub.com — its
// own Doorkeeper server, own app registration, own tokens. See
// hackclub/hackatime docs/oauth/oauth-apps.md. `read` is needed for the
// projects/hours endpoints; `profile` (the default) covers github_username.
export const HACKATIME_OAUTH_SCOPE = 'profile read'

export async function exchangeHackatimeCodeForToken({ code, redirectUri }) {
  const response = await fetch(`${HACKATIME_BASE}/oauth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: process.env.HACKATIME_UID,
      client_secret: process.env.HACKATIME_SECRET,
      redirect_uri: redirectUri,
    }),
  })

  if (!response.ok) {
    console.error('[hackatime] token exchange failed', response.status, await response.text())
    return null
  }
  return response.json()
}

export async function getHackatimeMe(accessToken) {
  const response = await fetch(`${HACKATIME_BASE}/api/v1/authenticated/me`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!response.ok) {
    console.error('[hackatime] /me failed', response.status, await response.text())
    return null
  }
  return response.json()
}

// Returns [{ name, total_seconds, most_recent_heartbeat, languages, archived }]
export async function getHackatimeProjects(accessToken) {
  const response = await fetch(`${HACKATIME_BASE}/api/v1/authenticated/projects`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!response.ok) {
    console.error('[hackatime] /projects failed', response.status, await response.text())
    return []
  }
  const data = await response.json()
  return data.projects ?? []
}

export function trackedHoursForProject(project) {
  if (!project) return 0
  return project.total_seconds / 3600
}
