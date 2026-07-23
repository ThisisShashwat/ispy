## Context

Today's model, end to end:

- `prizeTiers.js` groups items under a `hours` value per tier (1 / 3 / 15 / 25 / 50).
- `PrizePicker.jsx` renders every tier, disables items where `hoursTracked < tier.hours`, and calls `onSelect(item)` for exactly one item — `DashboardClient` holds this in a single `selectedPrize` state.
- `DashboardClient.jsx` sends one `prizeId`/`prizeName` pair in the submit `FormData`.
- `/api/submit/route.js` looks up that single item, re-derives `hoursTracked` server-side (from Hackatime or the client-submitted self-reported number, per track), and rejects with 403 if `hoursTracked < prizeMatch.tier.hours`. On success it writes `prizeName` as a plain string into `AIRTABLE_FIELDS.prize` and the numeric `hoursTracked` into `AIRTABLE_FIELDS.overrideHours`.

This change turns `tier.hours` into a per-unit cost and the picker into a cart: any combination of items/quantities is allowed as long as their total cost fits inside `hoursTracked`. Two other changes touch these same files concurrently (`add-hardware-software-submission-track` added the hardware/software branch and self-reported hours input; `gate-dashboard-and-hardware-grant` added the greeting-gated entry and the Hardware Grant item) — this design builds on top of both rather than reverting them.

## Goals / Non-Goals

**Goals:**
- Let a submitter allocate their available hours across multiple prizes and multiple units of the same prize in one submission.
- Enforce the total-cost-vs-budget rule both client-side (fast feedback, disabled submit) and server-side (untrusted client, same as today's single-item check).
- Serialize the resulting cart into the existing single `Prize` Airtable text field with no new columns, preserving quantities in a human-readable format.

**Non-Goals:**
- No persistent ledger of hours spent across submissions — the budget check is scoped entirely to the current submission's `hoursTracked`, exactly as today's single-item check is. A user resubmitting can re-spend the same hours; this is explicitly accepted per the proposal.
- No per-item pricing independent of tier grouping — an item's cost is simply its tier's `hours` value; this change doesn't introduce individual item pricing that differs from its tier.
- No special-casing of the `$6.5/hr Hardware Grant` item — it is bought like any other cart item, at 1 hour per unit, with its cash payout scaling accordingly if bought more than once.

## Decisions

**Cart state shape: `{ [itemId]: quantity }` rather than an array of line items.** A plain map keyed by item id makes "increment/decrement this item's quantity" and "compute total cost" simple lookups, and naturally dedupes — there's no way to end up with two separate entries for the same item id, which an array-of-`{id, qty}` would allow (and would need de-duping logic for on every mutation).

**Cost lookup stays keyed off `prizeTiers.js`'s existing tier grouping — no per-item `cost` field added to the data file.** Every item within a tier already shares one hour value; introducing a separate `cost` field per item that always equals its tier's `hours` would be a redundant, driftable duplicate of data that's already there. Cost is computed as `tier.hours` at lookup time, both client- and server-side, using the same `findPrize`-style lookup `/api/submit/route.js` already has.

**Budget check formula: `sum(cost(item) * quantity) <= hoursTracked`, evaluated identically client-side (for the disabled/enabled submit state and inline running-total display) and server-side (as the authoritative check, since `hoursTracked` itself is already re-derived server-side and not trusted from the client).** This mirrors the existing single-item check's trust boundary exactly — only the formula changes from a single comparison to a sum over the cart.

**Quantity UI: stepper (+/−) buttons per item row, not a raw number input.** Consistent with the existing button-driven `PrizePicker` grid, and it rules out invalid values (negative, non-integer, non-numeric) by construction rather than requiring input validation. A quantity of 0 means "not in the cart" — no separate remove control is needed.

**Airtable serialization: cart formatted as a comma-separated `"<name> ×<qty>"` list into the existing `Prize` field, e.g. `"One Key Keychain ×2, Casio Watch ×1"`.** Since Airtable's schema is fixed to what's already on the live base (per the prior hardware-track change) and no new columns are being added, the cart must fit into the existing single-line-text `Prize` field. A quantity of 1 could in principle be shown without the `×1` suffix, but always including it keeps the format uniform and simple to parse by eye.

**`overrideHours` continues to receive the submission's raw `hoursTracked`, unchanged.** This field already represents "hours behind this submission," not "hours spent" — the cart's total cost is a derived, cart-specific number and doesn't need its own Airtable field for this change to work; the existing field's meaning is preserved as-is.

## Risks / Trade-offs

- **[Risk] A submitter could leave a large portion of `hoursTracked` unspent (e.g. 26 hours available, cart totals 3) with no requirement to use the full budget.** → Accepted: nothing in the current single-item model required using all available hours either (a 50-hour-eligible user could still just take the 1-hour keychain), so this isn't a new gap.
- **[Risk] Re-submitting re-spends the same hours (no ledger).** → Explicitly accepted per the proposal; out of scope for this change.
- **[Risk] `Prize` field's free-text cart serialization is harder to aggregate/report on downstream (e.g. in Airtable views or exports) than a single clean prize name was.** → Mitigated by keeping the format simple and consistent (`"<name> ×<qty>"`, comma-separated); if downstream reporting needs become a problem later, that's a separate change to add structured Airtable fields.
- **[Risk] Concurrent in-progress changes (`add-hardware-software-submission-track`, `gate-dashboard-and-hardware-grant`) touch the same files (`DashboardClient.jsx`, `PrizePicker.jsx`).** → Mitigated by building this design directly on top of the current state of those files (already read and accounted for above) rather than assuming the pre-hardware-track version of the flow.

## Open Questions

- Should a quantity-0 item still render in the cart list (grayed out) for discoverability, or only appear once a quantity is set? Left as an implementation-time UI call, not a spec-level requirement.
