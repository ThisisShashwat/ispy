## Why

There's currently no way for a participant to actually turn logged hours into a claimed prize. `prizeTiers.js` and the `/prizes` page (from `add-prizes-route`) only display what's available — there's no login, no way to prove which project you shipped, and no path from "I want this" to a recorded request. We need an authenticated dashboard where a user logs in with Hack Club OAuth, picks the Hackatime project they're submitting, picks a prize they've actually earned the hours for, fills in the remaining project details, and has that create a record in Airtable — with no database of our own to run or maintain.

## What Changes

- Add Hack Club OAuth login (`auth.hackclub.com`), following the pattern used by `hackclub/hackachu`: authorization-code flow, server-side token exchange (client secret never reaches the browser), tokens held in an encrypted, stateless JWT cookie (no session store, no database).
- **BREAKING**: Migrate the app from a Vite + `react-router-dom` SPA to Next.js (App Router), since OAuth token exchange and the Airtable write both require a secret-holding server, which the current pure-client build doesn't have. This supersedes the client-side routing introduced by `add-prizes-route` — `/prizes` becomes a Next.js route instead of a `react-router-dom` route.
- Add a `/dashboard` route, gated to authenticated users, that:
  - Fetches identity (name, email, birthday, address) from `auth.hackclub.com/api/v1/me` and GitHub username + project list from the Hackatime API (`/api/v1/authenticated/me`, `/api/v1/authenticated/projects`), using the same OAuth access token for both.
  - Lets the user select exactly one Hackatime project to submit.
  - Shows the existing prize catalog (`prizeTiers.js`) as a picker, disabling any tier above the selected project's tracked hours (`total_seconds / 3600`) — a user can never select a prize they haven't earned.
  - Presents a submission form: identity fields autofilled and read-only from OAuth data; Playable URL, Code URL, Screenshot, Description, and Comments entered manually; Prize is the tier item selected above.
- Add a server-side submission endpoint that:
  - Re-validates all required fields server-side (client-side validation alone isn't trustworthy) and rejects with a clear, user-visible error if anything required is missing — no partial/invalid Airtable record is ever created.
  - Uploads the screenshot directly to Airtable via its attachment upload API (no separate file host).
  - Creates the Airtable record with all required fields plus `Prize` (required) and `Comments` (optional), and always sets `Optional - Override Hours Spent` to the same tracked-hours number used for gating — this field is never a free-text/user-editable value, so it can't be used to spoof eligibility.

## Capabilities

### New Capabilities
- `hackclub-oauth`: login/logout, authorization-code exchange, encrypted stateless session cookie, and fetching identity + Hackatime data with the resulting access token.
- `submission-dashboard`: authenticated dashboard UI — Hackatime project picker, hours-gated prize picker, submission form with autofill and client-side validation.
- `airtable-submission`: server-side endpoint that validates required fields, uploads the screenshot, and creates the Airtable record (including the auto-computed hours field).

### Modified Capabilities
(none — `prize-tier-breakdown`'s public `/prizes` page keeps its existing static/read-only requirements; the dashboard's prize picker is a separate, authenticated surface built on the same `prizeTiers.js` data.)

## Impact

- `add-prizes-route` is in-progress (14/15 tasks) and adds `react-router-dom`. This change takes priority and supersedes that routing approach — the Next.js migration here replaces `react-router-dom` regardless of `add-prizes-route`'s completion state; its unfinished task(s) don't block this work.
- New dependency: Next.js (replaces Vite build), `jose` (or similar) for JWT session encryption, removal of `react-router-dom`.
- New env vars/secrets: `HACKCLUB_CLIENT_ID`, `HACKCLUB_SECRET_ID`, `SESSION_SECRET`, Airtable API key + base/table IDs.
- New server surface: `/api/auth/login`, `/api/auth/callback`, `/api/submit` (or equivalent Next.js route handlers).
- Affected existing code: `src/pages/Home.jsx`, `src/pages/PrizesPage.jsx`, `src/data/prizeTiers.js`, routing/build config — all carry over with import-path changes rather than rewrites.
- No database of any kind is introduced; Airtable is the sole persistent store, sessions are stateless.
