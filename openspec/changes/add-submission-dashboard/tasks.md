## 1. Next.js migration foundation

- [x] 1.1 Scaffold Next.js (App Router) project structure alongside/replacing the Vite setup
- [x] 1.2 Port `src/pages/Home.jsx` → `app/page.tsx`, `src/pages/PrizesPage.jsx` → `app/prizes/page.tsx`
- [x] 1.3 Port `src/components/**`, `src/data/prizeTiers.js`, `src/assets/prizes/**` with import-path updates only
- [x] 1.4 Replace `react-router-dom` `<Link>` usages with `next/link`
- [x] 1.5 Remove Vite config/build tooling and `react-router-dom` dependency once parity is confirmed
- [x] 1.6 Verify existing pages render and navigate correctly under Next.js before adding new features

## 2. Hack Club OAuth (`hackclub-oauth`)

- [x] 2.1 Add `HACKCLUB_CLIENT_ID`, `HACKCLUB_SECRET_ID`, `SESSION_SECRET` env vars
- [x] 2.2 Implement `lib/session.ts`: encrypt/decrypt `{ access_token, refresh_token, expires_at }` as a JWE cookie (`jose`, `dir`/`A256GCM`, 7-day expiry)
- [x] 2.3 Implement `app/api/auth/login/route.ts`: redirect to `auth.hackclub.com/oauth/authorize` with correct scope and redirect_uri
- [x] 2.4 Implement `app/api/auth/callback/route.ts`: exchange code for tokens server-side, set encrypted session cookie, redirect to `/dashboard`; handle missing-code/error cases
- [x] 2.5 Implement `lib/hackclub.ts`: `getIdentity(access_token)` against `auth.hackclub.com/api/v1/me`
- [x] 2.6 Implement `lib/hackatime.ts`: `getHackatimeMe(access_token)` and `getHackatimeProjects(access_token)` against the Hackatime API, reusing the same access token
- [x] 2.7 Implement an auth guard/middleware for `/dashboard` and submission endpoints that redirects unauthenticated requests to login
- [x] 2.8 Add logout (clear session cookie)

## 3. Dashboard UI (`submission-dashboard`)

- [x] 3.1 Build `/dashboard` page shell, gated by the auth guard from 2.7
- [x] 3.2 Fetch and render the user's Hackatime projects (name, tracked hours, languages); handle the empty-project-list case
- [x] 3.3 Implement project selection state (exactly one selected project)
- [x] 3.4 Build prize picker UI reusing `prizeTiers.js` data; compute `hours_tracked = total_seconds / 3600` and disable tiers above it
- [x] 3.5 Recompute/reset prize eligibility and selection when the selected project changes
- [x] 3.6 Build submission form: read-only autofilled fields (name, email, birthday, address, GitHub username) from identity + Hackatime data
- [x] 3.7 Add editable required fields (Playable URL, Code URL, Screenshot upload, Description) and optional Comments
- [x] 3.8 Implement client-side validation: block submit and show inline errors when required fields are missing
- [x] 3.9 Wire submit action to call the submission endpoint (section 4) and surface success/error responses to the user

## 4. Airtable submission endpoint (`airtable-submission`)

- [x] 4.1 Add Airtable API key and base/table config as env vars
- [x] 4.2 Implement `app/api/submit/route.ts`, gated by the auth guard from 2.7
- [x] 4.3 Server-side re-validation of all required fields; return structured missing-field errors, create nothing on failure
- [x] 4.4 Server-side re-fetch of the selected project's tracked hours from Hackatime and re-check prize-tier eligibility independent of the client
- [x] 4.5 Implement screenshot upload to Airtable's attachment API; surface upload failures as submission errors without creating a partial record
- [x] 4.6 Compute `Optional - Override Hours Spent` server-side from the re-fetched tracked hours; ensure no client-supplied value can override it
- [x] 4.7 Create the Airtable record with all required fields, Prize, computed hours, and optional Comments
- [x] 4.8 Return a clear success/error response consumed by the dashboard form (task 3.9)

## 5. Verification

- [x] 5.1 Manually test full flow: login → project select → gated prize select → form autofill → submit → verify Airtable record and attachment
- [ ] 5.2 Test missing-required-field cases (client-blocked and, if bypassed, server-blocked)
- [ ] 5.3 Test ineligible-prize-selection case (disabled in UI, and rejected server-side if bypassed)
- [x] 5.4 Test unauthenticated access to `/dashboard` and the submit endpoint
- [ ] 5.5 Confirm `Optional - Override Hours Spent` in Airtable matches actual Hackatime tracked hours after a real submission

## 6. Post-launch enhancements

- [x] 6.1 Add `/dashboard/success` confirmation page; navigate there (instead of an inline message) on successful submission
- [x] 6.2 Cap the Hackatime project picker to the top 10 projects by tracked hours, with a client-side search input to find others (no additional Hackatime fetch)
