## Context

`DashboardClient` (`src/components/dashboard/DashboardClient.jsx`) is a single client component that owns all submission-flow state (`selectedProject`, `selectedPrize`, `fields`, `screenshot`, `errors`, `status`) and renders the 3-step flow unconditionally. `profile` (containing `firstName`, `lastName`, `email`, `githubUsername`) and `projects` are passed in as props from the server component `src/app/dashboard/page.jsx`, which already resolves them via `getIdentity()` and `getHackatimeProjects()` before render — no new data fetching is needed for the greeting.

## Goals / Non-Goals

**Goals:**
- Delay rendering of `ProjectPicker` and the rest of the flow until the user opts in via a "Submit a project" button.
- Greet the user by their OAuth first name on the initial dashboard view.
- Add the hardware grant prize to the shared `prizeTiers.js` data source.

**Non-Goals:**
- No changes to session/auth handling, Hackatime data fetching, validation logic, or the `/api/submit` endpoint.
- No changes to `/prizes` page markup — it already renders from `prizeTiers.js` and will pick up the new item automatically.
- Not solving eligibility/copy for the hardware grant beyond adding it to the tier-1 data entry (image asset and desc text are tracked as open items in tasks.md, not resolved by this design).

## Decisions

- **Gate implemented as local component state, not a route change.** A single `showForm` boolean (`useState(false)`) in `DashboardClient` toggles between the greeting view and the existing flow. Alternatives considered: splitting into two routes (`/dashboard` greeting, `/dashboard/submit` form) — rejected as unnecessary complexity for what is purely a reveal/sequencing change; would also require duplicating the server-side identity/project fetch or introducing client-side fetching.
- **No-firstName fallback: render "Welcome" with no name.** If `profile.firstName` is empty/falsy, the greeting reads just "Welcome" rather than falling back to email. Rationale: email is PII that doesn't belong in a friendly greeting, and a blank-but-present name in "Welcome, " would look broken — omitting it entirely is the cleanest degradation.
- **Hardware grant added as a second item in the existing `hours: 1` tier array**, not a new tier. Confirmed with the user that "tier one" refers to the existing 1-hour / `LVL 1 CLEARANCE` tier where the keychain lives. No changes to tier-eligibility logic (`PrizePicker.jsx`'s `hoursTracked >= tier.hours` check) are needed — the new item inherits the tier's existing threshold automatically.

## Risks / Trade-offs

- [The new prize item requires an image asset (every `prizeTiers` item currently has one) and the component doesn't guard against a missing/undefined `image` field] → tasks.md flags sourcing or placeholder-generating this asset as a blocking task before the data entry is added; do not ship a `hardware-grant` entry with no `image`.
- [Greeting state adds a new first-load UI path that isn't covered by any existing test/flow] → manually verify both the has-name and no-name greeting states, and that clicking "Submit a project" reveals the exact same flow as before (no regressions to `ProjectPicker`/`PrizePicker`/`SubmissionForm`).

## Migration Plan

Not applicable — client-side UI change with no data migration, deployed as a normal commit/PR. No rollback beyond reverting the change (no persisted state or schema affected).
