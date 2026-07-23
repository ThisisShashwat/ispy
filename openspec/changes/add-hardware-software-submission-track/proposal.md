## Why

The submission flow currently assumes every project is tracked in Hackatime — Hackatime project selection is a hard requirement, and prize eligibility is always derived from Hackatime's tracked hours. This doesn't fit hardware projects, which aren't coded in an editor Hackatime can instrument and are instead documented via a build journal. Forcing hardware builders through the Hackatime step blocks them from submitting at all. Splitting submission into a hardware and software track — asked right after "Submit a project" — lets each track require what's actually verifiable for it: Hackatime hours for software, a journal link and self-reported hours for hardware.

## What Changes

- After clicking "Submit a project," the dashboard SHALL ask the user to choose a category: **Hardware** or **Software**, before showing any project/hours step.
- **Software track** (unchanged): select a Hackatime project → prize picker gated by that project's Hackatime-tracked hours → submission form as it exists today.
- **Hardware track** (new): user types a self-reported number of hours (no Hackatime project selection) → the same prize picker, gated by that self-reported number → submission form with a new required **Journal Link** field in place of any Hackatime-derived data. Playable URL, Code URL, screenshot, description, and all identity/address fields remain required for both tracks.
- Server-side (`/api/submit`) validation branches by category: software keeps re-deriving and re-verifying hours from the authenticated user's Hackatime data (unchanged trust boundary); hardware trusts the client-submitted hours number directly (there is no independent hardware-hours source to re-check against) and requires `journalLink` instead of a matched Hackatime project.
- Two new Airtable fields are wired up: `Category` (sends `"Hardware"` or `"Software"`) and `Journal Link` (hardware only). Both columns already exist on the live Airtable base under those exact names.
- For hardware submissions, the self-reported hours value is written to the existing `Optional - Override Hours Spent` Airtable field — the same field software submissions already populate with their Hackatime-derived hours, just from a different, untrusted source for hardware.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `submission-dashboard`: adds a category choice (hardware/software) after "Submit a project," and a distinct hardware submission path (self-reported hours instead of Hackatime project selection, Journal Link field instead of Hackatime-derived data) alongside the existing software path.

## Impact

- `src/components/dashboard/DashboardClient.jsx`: add `category` state and branching; software branch keeps existing logic, hardware branch adds a self-reported-hours step and swaps validation/payload fields.
- `src/components/dashboard/ProjectPicker.jsx`: unchanged, used only on the software track.
- `src/components/dashboard/PrizePicker.jsx`: unchanged in behavior — continues to take a `hoursTracked` number regardless of whether it came from Hackatime or self-reporting.
- `src/components/dashboard/SubmissionForm.jsx`: add a conditionally-rendered, hardware-only `Journal Link` field.
- `src/app/api/submit/route.js`: branch validation and Airtable payload construction on category; hardware path skips the Hackatime project lookup/re-verification and requires `journalLink`.
- `src/lib/airtable.js`: add `category: 'Category'` and `journalLink: 'Journal Link'` to `AIRTABLE_FIELDS`.
- No changes to `/prizes`, `prizeTiers.js`, session/auth handling, or the Hackatime OAuth login itself (users still authenticate via Hack Club + Hackatime OAuth regardless of which track they submit under — only the *project-level* Hackatime linkage becomes optional).
