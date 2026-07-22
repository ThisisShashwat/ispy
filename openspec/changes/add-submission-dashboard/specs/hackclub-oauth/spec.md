## ADDED Requirements

### Requirement: Login initiates Hack Club OAuth
The system SHALL provide a login action that redirects the user to `auth.hackclub.com/oauth/authorize` with `client_id`, a `redirect_uri` derived from the current request origin, `response_type=code`, and `scope=name email verification_status`. The `birthdate` and `address` scopes SHALL NOT be requested, as they are restricted to HQ-Official-tier OAuth apps and requesting them from a Community-tier app is rejected by the authorization server.

#### Scenario: User clicks login
- **WHEN** an unauthenticated user triggers login
- **THEN** the browser is redirected to `auth.hackclub.com/oauth/authorize` with the required query parameters

### Requirement: Authorization code is exchanged server-side
On callback, the system SHALL exchange the received `code` for tokens via a server-to-server POST to `auth.hackclub.com/oauth/token` using `HACKCLUB_CLIENT_ID` and `HACKCLUB_SECRET_ID`. The client secret SHALL NOT be present in any client-side code, request, or response.

#### Scenario: Successful callback
- **WHEN** `auth.hackclub.com` redirects back with a valid `code`
- **THEN** the server exchanges it for `access_token`, `refresh_token`, and `expires_in`, and no secret is exposed to the browser

#### Scenario: Callback with error or missing code
- **WHEN** the callback request has no `code` or an `error` parameter
- **THEN** the user is redirected to an error state without attempting a token exchange

### Requirement: Session is a stateless encrypted cookie
The system SHALL store `{ access_token, refresh_token, expires_at }` as an encrypted JWT (JWE) in an httpOnly, secure cookie named `session`, valid for 7 days. The system SHALL NOT persist session data in any database, file, or in-memory store on the server.

#### Scenario: Session created after login
- **WHEN** token exchange succeeds
- **THEN** an encrypted `session` cookie is set and the user is redirected to `/dashboard`, with no server-side session record created anywhere

#### Scenario: Session decryption fails or is expired
- **WHEN** a request arrives with a missing, invalid, or expired `session` cookie
- **THEN** the user is treated as unauthenticated and routed to login when accessing protected pages

### Requirement: Identity and Hackatime data use the same access token
The system SHALL use the `access_token` from the session, unmodified, as the bearer token for both `auth.hackclub.com/api/v1/me` and Hackatime's `/api/v1/authenticated/me` and `/api/v1/authenticated/projects` endpoints. No additional OAuth client, scope request, or token exchange is required for Hackatime access.

#### Scenario: Fetching identity
- **WHEN** an authenticated request needs profile data
- **THEN** the system calls `auth.hackclub.com/api/v1/me` with `Authorization: Bearer <access_token>` and reads `first_name`, `last_name`, `primary_email`, `birthday`, and the primary `addresses` entry

#### Scenario: Fetching Hackatime data
- **WHEN** an authenticated request needs GitHub username or project list
- **THEN** the system calls Hackatime's `/api/v1/authenticated/me` (for `github_username`) and `/api/v1/authenticated/projects` (for the project list) using the same `access_token`

### Requirement: Protected routes require a valid session
The `/dashboard` route and all submission-related server endpoints SHALL require a valid, decryptable, non-expired session. Unauthenticated access SHALL be redirected to login rather than rendered or processed.

#### Scenario: Unauthenticated dashboard access
- **WHEN** a request to `/dashboard` has no valid session
- **THEN** the user is redirected to the login flow instead of seeing dashboard content

#### Scenario: Unauthenticated submission attempt
- **WHEN** a request to the submission endpoint has no valid session
- **THEN** the request is rejected without creating any Airtable record
