import { NextResponse } from 'next/server'
import { HACKCLUB_OAUTH_SCOPE } from '../../../../lib/hackclub'
import { getRedirectUri } from '../../../../lib/origin'

export async function GET(request) {
  const params = new URLSearchParams({
    client_id: process.env.HACKCLUB_CLIENT_ID,
    redirect_uri: getRedirectUri(request),
    response_type: 'code',
    scope: HACKCLUB_OAUTH_SCOPE,
  })

  return NextResponse.redirect(`https://auth.hackclub.com/oauth/authorize?${params}`)
}
