import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SESSION_COOKIE, decryptSession } from './session'

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  const session = await decryptSession(token)
  if (!session) return null
  if (session.expires_at && Date.now() > session.expires_at) return null
  return session
}

// For server components/pages: redirects to whichever OAuth hop is
// incomplete instead of rendering. A session can exist with only the Hack
// Club identity token if the user never finished (or was interrupted
// during) the second, Hackatime hop.
export async function requireSession() {
  const session = await getSession()
  if (!session) redirect('/api/auth/login')
  if (!session.hackatime_access_token) redirect('/api/auth/hackatime/login')
  return session
}

// For route handlers: returns the session or null so the caller can
// respond with 401 instead of a redirect (redirects don't make sense for
// an API/fetch caller).
export async function getSessionFromRequest() {
  return getSession()
}
