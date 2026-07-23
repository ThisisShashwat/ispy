## 1. Dashboard greeting + gated entry

- [x] 1.1 Add `showForm` state (`useState(false)`) to `DashboardClient`
- [x] 1.2 Render a greeting view when `showForm` is `false`: "Welcome, {profile.firstName}" if `profile.firstName` is truthy, otherwise plain "Welcome"; include a "Submit a project" button that sets `showForm` to `true`
- [x] 1.3 Wrap the existing step-1/2/3 flow (`ProjectPicker` through the submit button and status message) so it only renders when `showForm` is `true`
- [x] 1.4 Verify no other behavior in `DashboardClient` changes — `selectedProject`/`selectedPrize`/`fields`/`screenshot`/`errors`/`status` state, `handleSubmit`, and validation stay exactly as-is

## 2. Hardware grant prize

- [x] 2.1 Source or generate a placeholder image asset for the hardware grant under `src/assets/prizes/` (open item — needs a filename/image decided; follow existing naming convention, e.g. `hardware_grant_image.<ext>`)
- [x] 2.2 Decide the `desc` copy for the hardware grant item (open item — short description shown under the item name, matching the tone of existing entries like "domains are cool")
- [x] 2.3 Add `{ id: 'hardware-grant', name: '$6.5/hr Hardware Grant', image: <imported asset>, desc: <desc> }` to `prizeTiers[0].items` (the `hours: 1` / `LVL 1 CLEARANCE` tier) in `src/data/prizeTiers.js`, alongside the existing keychain item
- [x] 2.4 Confirm `highlightedPrizes` (homepage teaser) is unaffected — it references `prizeTiers[0].items[0]`, which stays the keychain, so no change needed there

## 3. Verification

- [x] 3.1 Run the app and confirm `/dashboard` loads to the greeting state first (both with and without a first name from OAuth, if testable) — verified by code inspection and production build; `/dashboard` requires real Hack Club OAuth so the rendered greeting itself wasn't visually driven end-to-end (see note below)
- [x] 3.2 Confirm clicking "Submit a project" reveals the project picker and the rest of the flow works unchanged end-to-end — verified by code inspection: the gated block is an unmodified copy of the prior unconditional JSX, only wrapped in `showForm &&`/early-return
- [x] 3.3 Confirm `/prizes` shows the hardware grant in the 1-hour tier alongside the keychain — verified live via `curl http://localhost:3100/prizes`, "$6.5/hr Hardware Grant" and its desc text render
- [x] 3.4 Confirm the dashboard's `PrizePicker` shows the hardware grant in the same tier, selectable once 1+ tracked hour is met — `PrizePicker.jsx` maps `prizeTiers` generically with no hardcoded item list, so the new entry is selectable under the same `hoursTracked >= tier.hours` check as the keychain; not independently re-verified live since it requires an authenticated session with a >=1hr Hackatime project
