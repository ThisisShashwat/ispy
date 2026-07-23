## Why

The dashboard currently opens straight into the Hackatime project picker, dropping every authenticated user into a full list of their tracked projects before they've decided to submit anything. This is jarring on login and gives no personalized acknowledgment that the OAuth sign-in worked. Gating the submission flow behind an explicit action, and greeting the user by name first, makes the first screen calmer and puts the user in control of when the heavier picker UI appears. Separately, the reward catalog needs a new low-barrier prize — a $6.5/hr hardware grant — added to the entry-level tier so it's available both on the public `/prizes` page and in the in-flow prize picker.

## What Changes

- `DashboardClient` no longer renders `ProjectPicker` (and the rest of the 3-step flow) immediately on load. It first shows a greeting state: "Welcome, {firstName}" (falling back to a name-less "Welcome" if `profile.firstName` is empty) plus a single "Submit a project" button.
- Clicking "Submit a project" reveals the existing, unchanged 3-step flow (select project → pick prize → submission details). No changes to `ProjectPicker`, `PrizePicker`, `SubmissionForm`, or the `/api/submit` route — this is purely a client-side reveal/sequencing change.
- Add a new prize item, `$6.5/hr Hardware Grant` (id: `hardware-grant`), to the `hours: 1` / `LVL 1 CLEARANCE` tier in `src/data/prizeTiers.js`, alongside the existing "One Key Keychain". Because both `/prizes` and the dashboard's `PrizePicker` read from this single data source, no other files need to change for the new prize to appear in both places.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `submission-dashboard`: adds a new requirement that the dashboard SHALL show an OAuth-greeting + "Submit a project" entry state before revealing the Hackatime project picker and the rest of the submission flow.

## Impact

- `src/components/dashboard/DashboardClient.jsx`: add gated/greeting state (`showForm`), greeting markup, and the "Submit a project" button; wrap the existing 3-step flow behind the toggle.
- `src/data/prizeTiers.js`: add the `hardware-grant` item to the `hours: 1` tier. Requires a new image asset under `src/assets/prizes/` and a short `desc` string — both currently undecided and called out in tasks.md as blocking items to resolve before/during implementation.
- No changes to `src/app/dashboard/page.jsx` (server-side identity/session fetching is untouched — `profile.firstName` is already fetched and passed down), `ProjectPicker.jsx`, `PrizePicker.jsx`, `SubmissionForm.jsx`, `/api/submit`, or `/prizes`.
