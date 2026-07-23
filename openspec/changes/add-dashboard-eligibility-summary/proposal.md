## Why

The `/dashboard` submission flow (`add-submission-dashboard`) jumps straight from the page header into "1. Select the project you're submitting" with no reminder of what actually qualifies as a valid project. The eligibility criteria only exist on the homepage (`Briefing.jsx`, `HowItWorks.jsx`), written as persuasive copy for a first-time visitor deciding whether to join — not as a quick reference for someone already authenticated and about to fill out a submission. Someone landing on `/dashboard` after their initial visit (or redirected there straight from OAuth) has no on-page reminder of the rules before they start submitting.

## What Changes

- Add a new static section at the very top of `src/app/dashboard/page.jsx`, above the existing "CASE FILE — AGENT DASHBOARD" eyebrow and "Submit a project" heading.
- Give it its own identity — its own eyebrow (e.g. "CASE FILE — ELIGIBILITY") and its own heading (e.g. "What Counts") — styled to match the homepage's existing `CASE FILE 00X` eyebrow/heading pattern (mono tracked-letter eyebrow + glitch-title heading), rather than reusing the dashed-border callout box from `PrizesPage.jsx` (that style stays scoped to `/prizes`).
- Content is a concise, independently-written bullet list (not a verbatim copy of homepage copy), covering exactly three points:
  - Real, working surveillance tech — not a mockup
  - Shipped publicly (repo, build, or hardware demo)
  - Hardware projects: some exceptions on "fully working"
- The section makes no mention of prizes, tiers, or hours — it is scoped purely to project eligibility, staying separate from the reward/hours mechanics already surfaced later in the form (`DashboardClient` shows tracked hours once a project is selected).
- The section is static and non-interactive; it renders from the server component (`src/app/dashboard/page.jsx`), not from `DashboardClient.jsx`.

## Capabilities

### New Capabilities
- `dashboard-eligibility-summary`: a static eligibility-criteria section rendered at the top of the authenticated `/dashboard` page, above the existing submission-flow header.

### Modified Capabilities
(none — `submission-dashboard`'s existing requirements for the project/prize/submission form are unchanged; this adds a new section ahead of that flow rather than altering it.)

## Impact

- Affected code: `src/app/dashboard/page.jsx` (new section added above `DashboardClient` render). `DashboardClient.jsx` and the submission form/validation logic are untouched.
- No new dependencies, routes, env vars, or server surface.
- No interaction with `prizeTiers.js`, Airtable, or Hackatime data — purely presentational, static copy.
