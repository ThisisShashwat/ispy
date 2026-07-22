## Why

The homepage prizes section currently teases only three fixed items with no explanation of how prizes are earned. The program needs a dedicated destination that breaks down rewards by hour tier (à la widget.hackclub.com/shop), so participants understand what shipping more hours unlocks, without cluttering the single-page homepage scroll.

## What Changes

- Add client-side routing (`react-router-dom`) to the app, which is currently a single-page scroller with no route concept. **BREAKING** (structural): `App.jsx`/`main.jsx` are restructured around a router instead of a flat section list.
- Add a new `/prizes` route/page that lays out prize rewards as hour-tiered columns (1/3/10/25/50-style tiers), each holding a grid of reward cards — the layout mechanic from the shop reference, rendered in this site's existing dossier/terminal visual language (`TerminalPane`, `DossierPhoto`, glitch titles, case-file framing).
- Introduce a tiered prize data source (e.g. `prizeTiers = [{ hours, codename, items: [{ id, name, image, desc }] }]`) with placeholder content, replacing/supplementing the current flat `prizes.js` list.
- Add static, clearly-worded messaging on the `/prizes` page explaining how the hour breakdown works (no live hour tracking — hours are logged externally and redeemed for the corresponding tier).
- Update the homepage `Prizes.jsx` teaser: keep the existing three-photo grid, but replace the "and more..." text with a link/button to `/prizes`.

## Capabilities

### New Capabilities
- `prize-tier-breakdown`: the `/prizes` route displaying hour-tiered reward columns with static explanatory copy, backed by placeholder tiered prize data.
- `app-routing`: client-side routing foundation (router setup, route table, navigation) enabling multiple pages within the app.

### Modified Capabilities
- `prize-showcase`: the homepage teaser's fixed three-item requirement is unchanged in content, but the "and more..." affordance is replaced by a navigational link to the new `/prizes` route.

## Impact

- New dependency: `react-router-dom`.
- Modified: `src/main.jsx` and/or `src/App.jsx` (router setup), `src/components/sections/Prizes.jsx` (teaser link).
- New: `/prizes` route/page component, tiered prize data file, placeholder tier assets.
- No backend/API changes — all data remains static/placeholder.
