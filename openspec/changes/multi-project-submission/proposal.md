## Why

The dashboard submission flow currently only lets a user pick one Hackatime project per submission, but a single real-world project often spans multiple Hackatime-tracked repos. Users need to submit hours across all of those repos together instead of being forced to pick just one and lose the rest of their tracked time.

## What Changes

- `ProjectPicker` becomes multi-select: clicking a project card toggles it in/out of the selection instead of replacing the current pick. No cap on how many projects can be selected.
- `DashboardClient` tracks a list of selected projects instead of one; the tracked-hours total used for prize eligibility becomes the sum of `total_seconds` across all selected projects, and the on-screen label lists the selected project names (comma-separated).
- The submit request sends all selected project names to the server instead of a single name.
- `/api/submit` re-derives each submitted project name against the session's freshly-fetched, authoritative Hackatime project list (same trust boundary as today — hours are never trusted from the client), rejects the submission if any name doesn't resolve, and sums `total_seconds` across all matched projects server-side to compute the hours written to Airtable.
- Project names are **not** persisted to Airtable, individually or combined — this matches current behavior, where only the summed hours value (`overrideHours` field) is written and the project name is discarded after use. No Airtable schema change.
- Only the "software" category path is affected. The "hardware" category (self-reported hours, no Hackatime project) is unchanged.

## Capabilities

### New Capabilities
- `project-submission`: selecting one or more Hackatime projects on the dashboard submission flow, and computing/verifying tracked hours from that selection (client display and server-side recomputation for the Airtable write).

### Modified Capabilities
(none — no existing spec covers project selection today)

## Impact

- `src/components/dashboard/ProjectPicker.jsx` — selection model (single → multi, toggle instead of replace)
- `src/components/dashboard/DashboardClient.jsx` — selection state, summed hours calculation, submit payload
- `src/app/api/submit/route.js` — parsing plural project names, per-name validation against authoritative Hackatime data, server-side hours summation
- No database/Airtable schema changes
