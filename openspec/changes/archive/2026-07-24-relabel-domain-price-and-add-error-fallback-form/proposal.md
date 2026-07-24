## Why

The domain grant's advertised value needs to go from $10 to $20 to match the current offer. Separately, submitters who hit a real submission failure (Airtable/API error, network error) currently have no recourse besides retrying the same form — if the form itself is broken, they're stuck. A backup Fillout form gives them a way out without us needing to treat it as a primary submission path.

## What Changes

- Relabel the `domain-grant` prize item in `prizeTiers.js` from "$10 Domain Grant" to "$20 Domain Grant". This is a display-text change only — the item's hour cost (3 hours, set by its tier) is unchanged. The new label propagates automatically to both `/prizes` and the dashboard prize-picker ("checkout") step, since both render `item.name` from the same data source.
- Add a plain link/button to the backup Fillout form (`https://forms.hackclub.com/t/eRmxM63EgHus`) on the dashboard submission form, shown only when `status === 'error'` as a result of `/api/submit` returning a non-ok response or the fetch throwing (network error).
- The link SHALL NOT appear for client-side validation failures (missing required fields, no project selected, no hours entered, cart exceeding available hours) — those are recoverable by fixing the form and don't warrant sending the user to a second form.

## Capabilities

### New Capabilities
- `submission-error-recovery`: defines when and how a backup submission path is surfaced to a user after a failed primary submission.

### Modified Capabilities
(none — no existing spec covers prize pricing display or dashboard submission error handling; the price relabel is a content change with no requirement-level behavior change)

## Impact

- `src/data/prizeTiers.js` — update `name` string for `domain-grant` item.
- `src/components/dashboard/DashboardClient.jsx` — render backup-form link conditionally alongside the existing error `statusMessage` block, gated on `status === 'error'` (which is only ever set by the two non-validation failure paths in `handleSubmit`).
- No API or data-model changes; no changes to `/api/submit`.
