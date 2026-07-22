## 1. Routing foundation

- [x] 1.1 Add `react-router-dom` dependency
- [x] 1.2 Restructure `main.jsx`/`App.jsx` to render a router with a `/` route wrapping the existing homepage section composition (no changes to section internals)
- [x] 1.3 Verify homepage still renders and anchor-scroll navigation within `/` still works after the routing wrap
- [ ] 1.4 Check the project's static deploy config supports SPA fallback for non-root paths (direct load/refresh of `/prizes`); update config if needed

## 2. Tiered prize data

- [x] 2.1 Create `src/data/prizeTiers.js` exporting a `prizeTiers` array (`{ hours, codename, items: [{ id, name, image, desc }] }`)
- [x] 2.2 Add placeholder images/assets for tier items, following the existing `src/assets/prizes/` convention

## 3. Prizes page

- [x] 3.1 Create the `/prizes` route and page component, reusing `TerminalPane` as the page shell
- [x] 3.2 Render tiers as labeled columns/sections in hour order, each showing its item grid, styled with existing dossier components (`DossierPhoto`, glitch titles, case-file copy conventions)
- [x] 3.3 Add static explanatory copy describing how the hour breakdown works (log hours externally → redeem at tier), placed above/alongside the tier columns
- [x] 3.4 Handle missing/broken item images gracefully (name/description still render, layout doesn't break)
- [x] 3.5 Register the `/prizes` route in the router from task 1.2

## 4. Homepage teaser update

- [x] 4.1 Replace the "and more..." text in `Prizes.jsx` with a link/button to `/prizes` using client-side navigation (router `Link`, not a plain `<a>` full reload)
- [x] 4.2 Confirm the teaser's existing three-item grid (Flipper Zero, monitor, GoPro) is unchanged

## 5. Verification

- [x] 5.1 Manually verify: homepage loads at `/`, teaser link navigates to `/prizes` without full reload, direct load of `/prizes` works, all tiers and placeholder items render
- [x] 5.2 Run existing lint/build checks to confirm no regressions
