## 1. Airtable field wiring

- [x] 1.1 Add `category: 'Category'` and `journalLink: 'Journal Link'` to `AIRTABLE_FIELDS` in `src/lib/airtable.js`

## 2. Category choice step

- [x] 2.1 Add `category` state (`useState(null)`) to `DashboardClient`, defaulting to unset when `showForm` becomes `true`
- [x] 2.2 Render a "Hardware or Software?" choice (two buttons) when `showForm` is `true` and `category` is not yet set
- [x] 2.3 Selecting a category advances to that track's flow; changing category later (if the UI allows going back) resets any track-specific state already entered (selected project / self-reported hours / journal link / selected prize) — added a "← change category" control that calls the same reset handler

## 3. Software track (verify unchanged)

- [x] 3.1 Confirm the existing `ProjectPicker` → `PrizePicker` (hoursTracked from `selectedProject.total_seconds / 3600`) → `SubmissionForm` sequence still renders exactly as before when category is "Software" — verified by inspection, the software branch is the same JSX/logic as before this change, just gated on `category === 'software'`
- [x] 3.2 No Journal Link field shown on the software track — `SubmissionForm` only renders the field when `category === 'hardware'`

## 4. Hardware track

- [x] 4.1 Add a new step component (or inline block) with a numeric "Hours spent" input, required, replacing `ProjectPicker` for the hardware track
- [x] 4.2 Feed the entered number into `PrizePicker` as `hoursTracked`, matching the same eligibility/disable behavior used on the software track
- [x] 4.3 Changing the self-reported hours value after a prize is selected deselects a now-ineligible prize (mirror the existing `handleSelectProject` behavior that clears `selectedPrize`)
- [x] 4.4 Add a required "Journal Link" field to `SubmissionForm`, shown only when category is "Hardware"
- [x] 4.5 Update client-side `validate()` in `DashboardClient` to require `journalLink` for hardware and not require a selected Hackatime project for hardware

## 5. Submission payload

- [x] 5.1 Update `handleSubmit` in `DashboardClient` to include `category` and, for hardware, `journalLink` and the self-reported hours value in the submitted `FormData`; for software, keep sending `projectName` as today
- [x] 5.2 In `/api/submit/route.js`, read `category` from the form data and branch the rest of the handler on it

## 6. Server-side validation — software branch (parallel to existing logic)

- [x] 6.1 Keep the existing re-fetch-from-Hackatime, re-derive-`hoursTracked`, require-`selectedProject`, and tier-eligibility-check logic scoped to `category === 'software'`
- [x] 6.2 Confirm the software branch's Airtable payload is unchanged except for the addition of `Category: 'Software'`

## 7. Server-side validation — hardware branch (new)

- [x] 7.1 Require `journalLink` as non-empty; add it to the missing-fields check (also added `hoursSpentRaw` to the same check, so a missing hours value is rejected the same way)
- [x] 7.2 Do not require or look up a matching Hackatime project for hardware submissions
- [x] 7.3 Use the client-submitted self-reported hours value directly for the tier-eligibility check (`hoursTracked < prizeMatch.tier.hours`), with no re-verification against Hackatime
- [x] 7.4 Build the hardware Airtable payload with `Category: 'Hardware'`, `Journal Link: <journalLink>`, and `Optional - Override Hours Spent: <self-reported hours>`

## 8. Verification

- [x] 8.1 Run the app; confirm clicking "Submit a project" shows the Hardware/Software choice before any project or hours step — verified by code inspection and production build (`next build` succeeds cleanly)
- [x] 8.2 Software track: confirm behavior is identical to before this change (project picker, hour-gated prizes, no Journal Link field, successful submission) — verified by inspection; `/dashboard` still redirects unauthenticated requests (307) as before, live end-to-end submission requires a real Hack Club/Hackatime OAuth session not available in this environment
- [x] 8.3 Hardware track: confirm the hours input gates the prize picker the same way Hackatime hours did, Journal Link is required, and a submission without a Hackatime project still succeeds — verified by inspection of `hoursTracked`/`trackIdentified` logic and the server's `category === 'hardware'` branch skipping the Hackatime project lookup
- [x] 8.4 Confirm a hardware submission missing Journal Link is rejected client-side (`validate()` adds `errors.journalLink`) and server-side (`requiredCheck['Journal Link']`) — verified by code inspection
- [x] 8.5 Confirm a hardware submission with insufficient self-reported hours for the selected prize is rejected server-side — verified by inspection: `hoursTracked < prizeMatch.tier.hours` check runs identically for both categories, using the self-reported number for hardware
- [x] 8.6 If credentials allow, confirm a real submission lands in Airtable with the correct `Category` and (for hardware) `Journal Link` values in the live base — **not run**; requires a real Hack Club OAuth login and a live Airtable write, neither available non-interactively in this environment. Recommend doing one manual test submission of each category before relying on this in production.
