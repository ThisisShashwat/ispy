import { NextResponse } from 'next/server'
import { getRequestOrigin } from '../../../../lib/origin'
import { sessionCookieOptions } from '../../../../lib/session'

export async function GET(request) {
  const response = NextResponse.redirect(`${getRequestOrigin(request)}/`)
  response.cookies.delete(sessionCookieOptions.name)
  return response
}
