import { NextResponse } from 'next/server'
import { getSession } from '../../../../../lib/auth'
import { exchangeHackatimeCodeForToken } from '../../../../../lib/hackatime'
import { getRequestOrigin } from '../../../../../lib/origin'
import { encryptSession, sessionCookieOptions } from '../../../../../lib/session'

export async function GET(request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const error = url.searchParams.get('error')
  const origin = getRequestOrigin(request)

  if (error || !code) {
    return NextResponse.redirect(`${origin}/?error=${encodeURIComponent(error || 'missing_code')}`)
  }

  // This hop only makes sense after the Hack Club identity hop already ran
  // and set a session cookie — if it's missing, restart from the top.
  const existingSession = await getSession()
  if (!existingSession) {
    return NextResponse.redirect(`${origin}/api/auth/login`)
  }

  const tokens = await exchangeHackatimeCodeForToken({
    code,
    redirectUri: `${origin}/api/auth/hackatime/callback`,
  })

  if (!tokens?.access_token) {
    return NextResponse.redirect(`${origin}/?error=hackatime_token_exchange_failed`)
  }

  const session = await encryptSession({
    ...existingSession,
    hackatime_access_token: tokens.access_token,
  })

  const response = NextResponse.redirect(`${origin}/dashboard`)
  response.cookies.set(sessionCookieOptions.name, session, sessionCookieOptions)
  return response
}
