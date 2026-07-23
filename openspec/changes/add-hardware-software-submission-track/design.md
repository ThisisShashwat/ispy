## Context

The submission flow lives in `DashboardClient.jsx` (owns all flow state) and its children `ProjectPicker`, `PrizePicker`, `SubmissionForm`. A prior change (`gate-dashboard-and-hardware-grant`, not yet archived) added a greeting + "Submit a project" gate before the flow appears. Today, the flow is: select Hackatime project → prize picker gated by that project's tracked hours → submission form. Both `PrizePicker` and `/api/submit` depend on a single `hoursTracked` number that currently only comes from a selected Hackatime project; `/api/submit` independently re-derives it from the user's session-authenticated Hackatime data as a trust boundary (never trusts the client's number for the software path).

Hardware projects can't be instrumented by Hackatime, so they need a different source of both "which project is this" (a Journal Link instead of a Hackatime project name) and "how many hours" (self-reported by the user, since there's nothing to re-verify against).

## Goals / Non-Goals

**Goals:**
- Ask Hardware vs Software right after "Submit a project," before any project/hours step.
- Software track behaves exactly as it does today — no regressions to Hackatime-based eligibility or its server-side re-verification.
- Hardware track: self-reported hours drive prize eligibility (both client gating and server-side check), Journal Link replaces Hackatime project identification, everything else (playable/code URL, screenshot, description, identity, address) stays required for both tracks.
- Wire the two new Airtable columns (`Category`, `Journal Link`) that already exist on the live base.

**Non-Goals:**
- No sanity bounds, plausibility checks, or manual-review workflow for self-reported hardware hours — this design treats "trust the number, let staff review the Journal Link" as the intended eligibility model (explicitly chosen over building any verification layer, since none is possible for hardware).
- No changes to `/prizes`, `prizeTiers.js`, OAuth/session handling, or the Hack Club/Hackatime login itself.
- No retroactive handling of the existing `Optional - Override Hours Spent` field's historical meaning — going forward it holds either a Hackatime-derived number (software) or a self-reported one (hardware), distinguished only by the new `Category` field.

## Decisions

- **`category` is client component state (`null | 'hardware' | 'software'`) in `DashboardClient`, gating which sub-flow renders** — same pattern as the existing `showForm` gate. Alternatives considered: separate routes per track — rejected for the same reason as the prior gating change (no new data-fetch needs, adds routing complexity for a purely presentational branch).
- **`PrizePicker` is reused unmodified for both tracks.** It already just takes a `hoursTracked` number; the design keeps that contract and simply feeds it a self-reported number on the hardware track instead of `selectedProject.total_seconds / 3600`. No component change needed here — confirmed by reading `PrizePicker.jsx`, which has no Hackatime-specific logic beyond the prop it's given.
- **Hardware hours input has no upper/lower sanity bound beyond "required, positive number."** Confirmed with the user: self-reported hours are trusted as-is; the Journal Link is the actual artifact reviewed by staff. Building plausibility checks would imply a verification guarantee the app can't back up.
- **Server-side validation branches on `category` in `/api/submit`, as a parallel branch rather than a shared code path.** The software branch is a verbatim copy of today's logic (re-fetch Hackatime, re-derive hours, require `selectedProject`). The hardware branch requires `journalLink`, skips the Hackatime project lookup entirely, and uses the client-submitted hours number directly for the eligibility check. Keeping these as separate branches (not a unified abstraction) avoids forcing a shared shape onto two validation models with fundamentally different trust properties.
- **Both tracks write to the existing `Optional - Override Hours Spent` Airtable field.** No new "hours" column — this field already exists and is already always populated (software path sends its Hackatime-derived number there today). Hardware just becomes a second, self-reported source for the same column, disambiguated by the new `Category` field alongside it.
- **`Category` values sent verbatim as `"Hardware"` / `"Software"`**, matching the live Airtable single-select field's configured option casing (confirmed with the user).

## Risks / Trade-offs

- [Self-reported hardware hours are fully unverifiable — a submitter could claim any number to unlock a higher prize tier] → Accepted by design; the Journal Link exists specifically so a human can catch this in review. This is a product/trust decision, not an oversight.
- [Server-side branch duplication between hardware/software paths in `/api/submit` increases the file's size and the number of places a future field change needs to be applied] → Acceptable for two tracks with genuinely different trust models; revisit only if a third track appears.
- [Airtable field names (`Category`, `Journal Link`) must match the live base exactly, or `createAirtableRecord`'s `typecast: false` call will fail the whole submission] → Confirmed exact spelling with the user before writing this design; implementation should not deviate from `"Category"` / `"Journal Link"`.

## Migration Plan

Not applicable — client-side and API-route UI/logic change, no data migration. Existing rows in Airtable predate the `Category` field and will simply have it blank; no backfill is in scope here.
