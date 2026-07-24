## 1. Domain grant relabel

- [x] 1.1 Update `domain-grant` item's `name` in `src/data/prizeTiers.js` from `"$10 Domain Grant"` to `"$20 Domain Grant"`
- [x] 1.2 Verify `/prizes` shows the updated label
- [x] 1.3 Verify the dashboard prize-picker (cart step) shows the updated label

## 2. Backup form link on submission error

- [x] 2.1 Add a `showBackupForm` (or equivalent) condition in `DashboardClient.jsx` that is true only when `status === 'error'` AND the error originated from the API/network paths (not from `validate()` or the category/project/hours guards)
- [x] 2.2 Render a plain link/button to `https://forms.hackclub.com/t/eRmxM63EgHus` next to the existing error `statusMessage`, gated on that condition
- [x] 2.3 Confirm the link does not appear for: missing required fields, missing project selection, missing hours entry, or cart exceeding available hours
- [x] 2.4 Confirm the link does appear for: a non-ok `/api/submit` response and a network/fetch exception
- [x] 2.5 Confirm the primary form remains visible and submittable while the backup link is shown
