const LOCAL_HOST = /^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/

// Derives the public-facing origin from request headers rather than the
// server's own bind address, which is wrong behind a proxy/in dev containers.
// This is what makes OAuth redirect URIs (Hack Club + Hackatime) work
// automatically on both localhost and the deployed domain — the redirect_uri
// sent to each provider is built from whatever host the request actually
// came in on, so there's nothing to hardcode or swap between environments.
export function getRequestOrigin(request) {
  const forwardedProto = request.headers.get('x-forwarded-proto')
  const forwardedHost = request.headers.get('x-forwarded-host')
  const host = forwardedHost || request.headers.get('host')
  const protocol = forwardedProto || (LOCAL_HOST.test(host ?? '') ? 'http' : 'https')
  return `${protocol}://${host}`
}

export function getRedirectUri(request) {
  return `${getRequestOrigin(request)}/api/auth/callback`
}
