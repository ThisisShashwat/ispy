## Context

Today's flow (software category only):

1. `ProjectPicker` renders Hackatime projects fetched server-side (`getHackatimeProjects`, passed down from `src/app/dashboard/page.jsx`); clicking a card calls `onSelect(project)`, which **replaces** `DashboardClient`'s single `selectedProject` state.
2. `DashboardClient` computes `hoursTracked = selectedProject.total_seconds / 3600` and uses it for prize-cart eligibility. On submit it sends `projectName` (a single string) in the `FormData` body.
3. `/api/submit/route.js` re-fetches the user's Hackatime projects itself (never trusts client-supplied hours), finds the one matching `projectName`, recomputes `hoursTracked` from that authoritative record, and writes only the numeric total to Airtable's `overrideHours` field. The project name itself is never written anywhere — it's discarded after being used to look up hours.

This change makes selection plural at every one of those three points, without touching the Airtable schema.

## Goals / Non-Goals

**Goals:**
- Let a user select any number of Hackatime projects for one submission.
- Sum tracked hours across all selected projects, both for the client-side eligibility display and the server-side authoritative Airtable write.
- Keep the server as the source of truth for hours: it must independently re-resolve every submitted project name against a fresh Hackatime fetch, exactly as it does today for one name.

**Non-Goals:**
- Persisting project names (individually or joined) to Airtable — no new column, no change to `AIRTABLE_FIELDS`.
- Any cap/max on number of selected projects.
- Any change to the "hardware" category submission path.
- Any change to how a single project's hours are computed (`total_seconds / 3600` stays the same math, just summed across N projects).

## Decisions

**Selection state shape: array of project objects, not names.**
`DashboardClient` keeps `selectedProjects` as an array of the full project objects (as already returned by `getHackatimeProjects`), not just names. This mirrors the current single-object approach and keeps `total_seconds` available locally for the hours display without extra lookups. Toggling is by `name` equality (project names are already used as the unique key in `ProjectPicker`'s `key={project.name}`).

**Toggle, not replace, on card click.**
`ProjectPicker.onSelect` semantics change from "set the selection" to "toggle membership." The card's `selected` check changes from `selectedProject?.name === project.name` to `selectedProjects.some(p => p.name === project.name)`.

**Transport: comma-separated string in one `projectName` form field.**
The client joins selected names with `, ` and sends them under the existing `projectName` key, rather than adding a new field name or using `FormData.append` for repeated keys. This is the smallest change to the request contract and avoids the server needing to distinguish "old single-value clients" from "new multi-value clients" — there are none in production to support, per the proposal. The server splits on `,` and trims each piece.

Alternative considered: multiple `formData.append('projectName', name)` entries, read server-side with `formData.getAll('projectName')`. Rejected only because it's marginally more moving parts for no behavioral difference; either works. Comma-join was chosen as simplest given names are assumed not to contain commas (Hackatime project names are repo-derived slugs/identifiers).

**Server-side validation: reject the whole submission if any name doesn't resolve.**
Same failure mode as today's single-project case (`'Selected project not found on Hackatime'`), just checked per name. If a client submits a name that doesn't match any project in the fresh authoritative fetch, the entire submission is rejected with 400 — no partial acceptance of "the projects that did match."

**Server-side hours: sum `total_seconds` across all matched projects, then convert once.**
`hoursTracked = matchedProjects.reduce((sum, p) => sum + p.total_seconds, 0) / 3600`, replacing the single-project `selectedProject.total_seconds / 3600`. Written to `AIRTABLE_FIELDS.overrideHours` exactly as before — no schema change.

**Display text: comma-join names for the human-readable label.**
`DashboardClient`'s "N tracked hours on "X"" label becomes "N tracked hours on "X, Y, Z"" by joining `selectedProjects.map(p => p.name)`.

## Risks / Trade-offs

- **[Risk]** A Hackatime project name containing a literal comma would break the comma-split parsing on the server, silently mis-attributing hours. → **Mitigation**: Hackatime project names come from repo/directory identifiers and are not expected to contain commas in practice; this matches the existing (unvalidated) assumption already made about names not containing other FormData-unsafe characters. Not worth a delimiter-escaping scheme for a case that doesn't occur.
- **[Risk]** Removing all selections mid-flow (deselecting the last project) needs to fall back to the existing "no project selected" empty/error state cleanly. → **Mitigation**: `trackIdentified` (currently `Boolean(selectedProject)`) becomes `selectedProjects.length > 0`, so this falls out naturally from the array-length check.
- **[Trade-off]** No per-project breakdown is visible anywhere after submission (client or Airtable) — only the summed total. This is an explicit, deliberate scope decision from the proposal, not an oversight.

