## 1. Data helpers

- [x] 1.1 Add a shared cost-lookup helper (e.g. `findPrize`/cost-by-id) usable by both `PrizePicker.jsx` and `/api/submit/route.js`, keyed off `prizeTiers.js`'s existing tier grouping (no new `cost` field added to the data file)
- [x] 1.2 Update the comment/documentation in `prizeTiers.js` to reflect that `hours` now means "per-item cost," not "unlock threshold"

## 2. PrizePicker cart UI

- [x] 2.1 Replace `PrizePicker.jsx`'s single-select button grid with a quantity-stepper (+/−) row per item
- [x] 2.2 Remove the `eligible`/disabled-tier gating logic; all items are always selectable, subject only to the budget check
- [x] 2.3 Display a running total (`sum(cost × qty)`) against the available budget, visually flagging when over budget

## 3. DashboardClient cart state

- [x] 3.1 Replace `selectedPrize` state with cart state shaped as `{ [itemId]: quantity }`
- [x] 3.2 Relabel "2. Pick your prize" step to "2. Pick your prizes"
- [x] 3.3 Update the gating logic that reveals step 3 (submission details) to require a non-empty, in-budget cart instead of `selectedPrize` being set
- [x] 3.4 Update `handleSubmit` to serialize the cart into the submitted `FormData` (item ids + quantities) instead of single `prizeId`/`prizeName` fields
- [x] 3.5 Update the "changing project/hours invalidates prior prize choice" behavior (`handleSelectProject`, `handleHoursSpentChange`, `handleSelectCategory`) to clear the cart instead of `selectedPrize`

## 4. Server-side validation and serialization

- [x] 4.1 Update `/api/submit/route.js` to parse a cart payload (item ids + quantities) instead of single `prizeId`/`prizeName` form fields
- [x] 4.2 Replace the single-item `hoursTracked < prizeMatch.tier.hours` check with a cart-total-vs-budget check (`sum(cost(item) * qty) <= hoursTracked`), using the same server-derived `hoursTracked` value already computed today
- [x] 4.3 Reject with a clear error (consistent with today's 403 pattern) when the cart total exceeds budget or the cart is empty
- [x] 4.4 Serialize the validated cart into `AIRTABLE_FIELDS.prize` as a comma-separated `"<name> ×<quantity>"` list
- [x] 4.5 Leave `AIRTABLE_FIELDS.overrideHours` populated with the submission's raw `hoursTracked`, unchanged

## 5. Verification

- [x] 5.1 Confirm a cart with multiple distinct items serializes and submits correctly
- [x] 5.2 Confirm a cart with multiple units of the same item serializes and submits correctly (e.g. `"One Key Keychain ×2"`)
- [x] 5.3 Confirm an over-budget cart is blocked both client-side (disabled submit) and server-side (rejected if posted directly)
- [x] 5.4 Confirm an empty cart blocks submission the same way a missing `selectedPrize` did before
- [x] 5.5 Confirm the `$6.5/hr Hardware Grant` item behaves like any other cart item (no special-case exclusion)
- [x] 5.6 Run `npm run build` to confirm the app compiles with no type/lint errors
