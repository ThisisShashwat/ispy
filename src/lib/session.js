import { createHash } from 'node:crypto'
import { EncryptJWT, jwtDecrypt } from 'jose'

const SESSION_COOKIE = 'session'
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days

// A256GCM requires exactly a 32-byte key; SESSION_SECRET can be any length,
// so it's hashed down to a fixed-size key rather than used directly.
function getSessionKey() {
  const secret = process.env.SESSION_SECRET
  if (!secret) {
    throw new Error('SESSION_SECRET is not set')
  }
  return createHash('sha256').update(secret).digest()
}

// Session payload is exactly the OAuth tokens — nothing else is ever stored
// server-side, so there is no session record/table/KV to keep in sync.
// Payload is a plain object so it can carry tokens from both the Hack Club
// identity OAuth hop (access_token, refresh_token, expires_at) and the
// separate Hackatime OAuth hop (hackatime_access_token) — two independent
// OAuth providers, merged into one cookie so the dashboard only needs one
// session read.
export async function encryptSession(payload) {
  const key = getSessionKey()
  return new EncryptJWT({ ...payload })
    .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .encrypt(key)
}

export async function decryptSession(token) {
  if (!token) return null
  try {
    const key = getSessionKey()
    const { payload } = await jwtDecrypt(token, key)
    return payload
  } catch {
    return null
  }
}

export const sessionCookieOptions = {
  name: SESSION_COOKIE,
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/',
  maxAge: SESSION_TTL_SECONDS,
}

export { SESSION_COOKIE }
