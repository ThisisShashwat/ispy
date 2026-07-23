## Why

The dashboard's prize picker currently lets a submitter claim exactly one item, gated by an eligibility threshold: `hoursTracked >= tier.hours` unlocks a tier, and the user picks a single item from whatever's unlocked. This doesn't reflect how the reward hours actually work in practice — hours are better modeled as spendable currency than as an unlock gate, letting a submitter choose how to allocate their logged hours across multiple prizes (including multiple units of the same prize) rather than being forced into a single pick. Reframing `tier.hours` as each item's flat hour-cost and letting the picker become a budgeted cart addresses this directly.

## What Changes

- **BREAKING**: Reinterpret `prizeTiers.js`'s `hours` field from "minimum hours required to unlock this tier's items" to "flat hour-cost of any item in this tier." The existing tier groupings (1 / 3 / 15 / 25 / 50 hours) are unchanged in value, only in meaning.
- Replace `PrizePicker`'s single-select button grid with a cart: each item gets a quantity stepper (+/−), and the user may select any combination of items and quantities, including multiple units of the same item.
- The cart's total cost (`sum(item.cost × quantity)` across all selected items) SHALL NOT exceed the current submission's `hoursTracked` (Hackatime-derived for software, self-reported for hardware — unchanged source). This is a per-submission budget check only; no ledger of previously-redeemed hours is introduced or checked.
- `DashboardClient` replaces its single `selectedPrize` state with a cart (map of item id → quantity) and a running total vs. budget display; the "Pick your prize" step becomes "Pick your prizes," and submission is blocked (as it is today for a missing prize) when the cart is empty or over budget.
- `/api/submit` replaces its single `prizeId`/`prizeName` fields and single-item eligibility check with a cart payload, re-validates the same budget constraint server-side (never trusting the client's total), and serializes the cart into the existing single-line-text `Prize` Airtable field as a formatted list including quantities (e.g. `"One Key Keychain ×2, Casio Watch ×1"`) rather than a bare name — no new Airtable columns.
- The `$6.5/hr Hardware Grant` item participates in the cart like any other item: it costs 1 hour per unit, and multiple units multiply its payout accordingly (this is an accepted, deliberate outcome, not an edge case to special-case away).

## Capabilities

### New Capabilities
- `prize-cart-checkout`: budgeted multi-item, multi-quantity prize selection — cart state, cost/budget validation (client and server), and cart serialization into the submission record.

### Modified Capabilities
(none — no capability has been archived to `openspec/specs/` yet for the dashboard/submission flow; `submission-dashboard` and prize-eligibility behavior are still defined only in in-progress changes' own specs, referenced under Impact below.)

## Impact

- `src/components/dashboard/PrizePicker.jsx`: rewritten from a single-select button grid to a quantity-stepper cart UI.
- `src/components/dashboard/DashboardClient.jsx`: `selectedPrize` state replaced with cart state (item id → quantity); "2. Pick your prize" step relabeled and its gating logic (`trackIdentified && selectedPrize` → showing step 3) changed to a non-empty, in-budget cart.
- `src/data/prizeTiers.js`: no structural change, but the `hours` field's meaning changes from "unlock threshold" to "per-item cost" — comment/documentation update.
- `src/app/api/submit/route.js`: replaces single `prizeId`/`prizeName` form fields and the single-item `hoursTracked < prizeMatch.tier.hours` check with a cart payload (item ids + quantities), a total-cost-vs-budget validation, and cart-to-string serialization for the `Prize` Airtable field.
- Interacts with the in-progress `add-hardware-software-submission-track` change (adds the hardware/self-reported-hours path `DashboardClient` already has) and `gate-dashboard-and-hardware-grant` (added the `$6.5/hr Hardware Grant` item and the greeting-gated flow) — this change builds on top of both, touching the same files (`DashboardClient.jsx`, `PrizePicker.jsx`).
- No new dependencies, routes, or Airtable schema columns. No persistent ledger of spent hours is introduced (explicitly out of scope for this change).
