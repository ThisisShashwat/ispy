## Context

The app is currently a Vite + React SPA (`src/pages/Home.jsx`, `PrizesPage.jsx`, `react-router-dom`) with no server and no persistence beyond static data files (`prizeTiers.js`). We need to add: OAuth login against Hack Club's identity provider, a call to the separate Hackatime API using that same token, an authenticated dashboard, and a write path to Airtable — two of which (OAuth token exchange, Airtable write) require a secret that must never reach the browser. `add-prizes-route` (in-progress) added `react-router-dom`-based routing; per explicit direction, this change takes priority and its Next.js migration supersedes that routing approach regardless of that change's completion state.

Reference implementation for the OAuth piece: `hackclub/hackachu` (Next.js, App Router, `auth.hackclub.com` OAuth, encrypted-JWT-cookie sessions, no database).

## Goals / Non-Goals

**Goals:**
- No database or KV store of any kind — Airtable is the only persistent store, sessions are stateless.
- OAuth client secret and Airtable API key never reach the browser.
- A user can only select prize tiers they've actually earned, based on real Hackatime data — not a value they can type in themselves.
- A submission either fully succeeds (valid Airtable record with attachment) or fails loudly with a clear message — no partial records.

**Non-Goals:**
- No admin/review UI for submissions — Airtable itself is the review surface.
- No enforcement of "one submission per project" or duplicate detection (not requested; can be a follow-up).
- No live/webhook-based hour tracking — hours are read at submission time from Hackatime's API, not continuously synced.
- No support for submitting without a Hackatime project (every submission ties to exactly one project).

## Decisions

### 1. Migrate Vite SPA → Next.js (App Router)
OAuth token exchange and the Airtable write both need a server holding a secret. Vite produces a static client-only build with no such server. Next.js gives us route handlers (`app/api/**/route.ts`) in the same project/deploy, matching `hackachu`'s proven pattern, instead of standing up a separate backend.
- *Alternative considered*: keep Vite, add serverless functions (Vercel/Netlify) alongside it. Rejected per explicit direction to migrate to Next.js — also would have meant two build systems (Vite for the app, platform-specific function bundler for the API) instead of one.

### 2. Stateless encrypted-JWT session (no database)
Mirrors `hackachu`'s `lib/session.ts`: `{ access_token, refresh_token, expires_at }` encrypted with `jose` (`EncryptJWT`, `dir`/`A256GCM`, key from `SESSION_SECRET`) into an httpOnly, secure cookie, 7-day expiry. No server-side session record exists anywhere.
- *Alternative considered*: a sessions table/KV. Rejected — explicitly out of scope ("no database setup at all").

### 3. One OAuth app, one access token, used against two APIs
The Hack Club identity token from `auth.hackclub.com` is used directly as the bearer token against both `auth.hackclub.com/api/v1/me` and Hackatime's `/api/v1/authenticated/me` + `/api/v1/authenticated/projects` — confirmed working as-is, no second OAuth client or additional scope needed. Scope requested at `/oauth/authorize` stays `name email birthdate address verification_status`.

### 4. Hours gating uses the selected project's tracked hours only, and is server-enforced
`hours_tracked = selectedProject.total_seconds / 3600`. The prize picker disables tiers above `hours_tracked` client-side for UX, but `/api/submit` independently recomputes `hours_tracked` from a fresh Hackatime API call and rejects the submission if the requested prize's tier exceeds it — the client-side disabling is a convenience, not the security boundary.
- *Alternative considered*: let the user self-report an hours value that affects gating. Explicitly rejected ("we shouldn't trust the user blindly to submit their hours").

### 5. `Optional - Override Hours Spent` is system-computed, never user input
This Airtable field is always set to the same `hours_tracked` value used for gating. There is no form field for it — it's not part of the client payload at all, only written server-side at record-creation time. This closes off the obvious spoofing vector (a free-text hours field) while still populating the column every time, per requirements.

### 6. Screenshot uploaded server-side via Airtable's attachment API
The client sends the file to `/api/submit` (multipart/form-data or base64), and the server relays it to Airtable's attachment upload endpoint as part of record creation. No third-party file host, no public-URL requirement placed on the user.
- *Alternative considered*: user pastes an image URL. Rejected — worse UX, and depends on the user already having hosting for the image.

### 7. GitHub username sourced from Hackatime, not entered manually
`auth.hackclub.com` identity doesn't return `github_username`; Hackatime's `/api/v1/authenticated/me` does. Fetched server-side alongside the projects list and passed to the dashboard as read-only, autofilled data — same trust tier as name/email/address.

### 8. Server-side validation is authoritative; client-side is UX only
`/api/submit` re-checks every required field (Playable URL, Code URL, First/Last Name, Email, Screenshot, Description, GitHub Username, full address, Birthday, Prize) is present and non-empty before touching Airtable. Missing-field errors are returned as structured data the dashboard renders inline; nothing is sent to Airtable on a failed validation.

### 9. Birthday and address are manually entered, not OAuth-autofilled
Discovered during implementation testing: `auth.hackclub.com` scopes are tiered by OAuth app registration (`hackclub/auth`, `app/models/oauth_scope.rb`) — `birthdate` and `address` are HQ-Official-tier-only scopes. Requesting them from this app (registered at Community tier) causes `auth.hackclub.com` to reject the whole authorization request with "invalid scope." Per explicit decision, rather than blocking on a tier upgrade, the requested scope was reduced to `name email verification_status`, and Birthday + full address became manual required fields in the submission form, validated the same as Playable URL/Code URL (client-side for UX, server-side authoritatively). First Name, Last Name, Email, and GitHub Username remain autofilled and read-only, since those scopes are Community-tier-available.
- *Follow-up option*: if this app is later granted HQ Official tier, the scope can be widened back to include `birthdate address` and these two field groups moved back to read-only autofill — the rest of the design (server-side re-validation, Airtable field mapping) is unaffected either way.

## Risks / Trade-offs

- [Next.js migration touches build tooling and routing broadly] → Scoped as import-path/config changes, not component rewrites; `src/components` and `src/data/prizeTiers.js` carry over largely unchanged (see proposal Impact).
- [Hackatime API shape/auth could differ from what's documented] → Already empirically confirmed (per explicit user direction) that the identity access token works as-is against Hackatime; no further spike needed.
- [Airtable attachment upload API has payload-size/format constraints not yet verified] → Validate during implementation; if a screenshot is rejected by Airtable (too large/wrong format), surface that as a submission error rather than silently failing.
- [No duplicate-submission protection] → A user can submit the same project repeatedly. Accepted as non-goal; Airtable review is the backstop.
- [Refresh-token handling for expired access tokens is unspecified] → `hackachu` stores a `refresh_token` but this design doesn't yet define when/how it's used to refresh; if a token expires mid-session, current plan is to require re-login. Flagged as an open question below.

## Open Questions

- Should an expired `access_token` trigger a silent refresh (using the stored `refresh_token`) or force the user back through `/api/auth/login`? Silent refresh is more seamless but adds complexity; forcing re-login is simpler and matches the "no persistent server state beyond the cookie" spirit.
- Exact Airtable field name/type for `Optional - Override Hours Spent` (number vs. text) needs confirming against the live base before implementation.
