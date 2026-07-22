import { NextResponse } from 'next/server'
import { HACKATIME_OAUTH_SCOPE } from '../../../../../lib/hackatime'
import { getRequestOrigin } from '../../../../../lib/origin'

export async function GET(request) {
  const params = new URLSearchParams({
    client_id: process.env.HACKATIME_UID,
    redirect_uri: `${getRequestOrigin(request)}/api/auth/hackatime/callback`,
    response_type: 'code',
    scope: HACKATIME_OAUTH_SCOPE,
  })

  return NextResponse.redirect(`https://hackatime.hackclub.com/oauth/authorize?${params}`)
}
