## Context

The site (`second-ysws`) is currently a single-page React app: `App.jsx` composes a flat stack of `<section>` components (`Prizes`, `Arsenal`, etc.), navigated via in-page anchor scrolling. There is no router, no route table, and no concept of a second page. The homepage's dossier/terminal visual system (`TerminalPane`, `DossierPhoto`, glitch titles, case-file copy) is established and should be reused, not replaced, on the new page. The reference (widget.hackclub.com/shop) contributes only its *layout mechanic* — hour-tier columns of reward cards — not its retro-OS-window skin.

## Goals / Non-Goals

**Goals:**
- Stand up minimal client-side routing so `/` (homepage) and `/prizes` (new page) both work, including direct navigation/refresh on `/prizes`.
- Present prizes grouped by hour tier, in a column layout, styled with existing dossier components.
- Make the static hour-breakdown mechanic (log hours externally → redeem at a tier) unambiguous to a first-time visitor.
- Keep prize content data-driven and swappable, matching the existing `prizes.js` pattern (placeholder images/text now, real data later with no code changes).
- Link the homepage teaser to the new route without changing the teaser's existing three-item content.

**Non-Goals:**
- No live hour tracking, accounts, or Hackatime-style integration — hours are static/informational only.
- No adoption of the reference site's OS-window chrome, tabs, or desktop-icon nav.
- No redesign of unrelated homepage sections (Arsenal, etc.) or the overall site nav beyond the one teaser link.
- No pagination/overflow-within-a-tier mechanic (the reference's `2/3` + arrows) unless a tier's placeholder data actually needs it — out of scope for this pass since content is placeholder.

## Decisions

**Routing library: `react-router-dom` (`createBrowserRouter` / `<RouterProvider>`).**
Alternative considered: hash-based routing (`/#/prizes`) to avoid any server config. Rejected because it's a worse long-term URL shape and this is a static Vite/SPA build where the existing deploy target should already fall back to `index.html` for client routes (or can be configured to — flagged as an open question below). `react-router-dom` is the standard, well-supported choice and keeps `App.jsx` route wiring simple.

**Route structure: two top-level routes, `/` and `/prizes`, sharing no layout shell for now.**
Alternative considered: a shared `<Layout>` route with persistent header nav. Rejected for this change — the homepage currently has no persistent header, and adding one is a larger scope change than what was proposed. The `/prizes` page gets its own self-contained header/back-link instead.

**Data model: new `prizeTiers` array in `src/data/prizeTiers.js`, separate from the existing flat `src/data/prizes.js`.**
Alternative considered: reshape `prizes.js` itself into tiers and have the homepage teaser consume a flattened view of it. Rejected because `prize-showcase`'s existing spec pins the homepage teaser to a fixed, independent three-item list unrelated to tiers — conflating the two data sources risks breaking that requirement when tier data changes later. Keeping them separate also lets tier data be placeholder/volatile without touching the stable teaser.

```js
// src/data/prizeTiers.js
export const prizeTiers = [
  {
    hours: 1,
    codename: 'LVL 1 CLEARANCE',
    items: [ { id, name, image, desc } ]
  },
  // ...
]
```

**Page composition: reuse `TerminalPane` as the page shell, one dossier-styled column block per tier.**
Alternative considered: build a bespoke full-page layout unrelated to `TerminalPane`. Rejected — reusing the existing shell keeps the new page visually consistent with the rest of the site with minimal new component surface.

**Explanatory copy: a static "how this works" block at the top of `/prizes`, above the tier columns.**
Plain-language, e.g. "Log hours shipping projects. Hit a tier, claim what's in it." Placed once, not per-tier, to avoid repetition — each tier heading just states its hour threshold.

## Risks / Trade-offs

- [Risk] Client-side routing on a static host can 404 on direct load/refresh of `/prizes` if the host isn't configured to fall back to `index.html`. → Mitigation: verify/document the deploy target's SPA fallback config as part of implementation; flagged as an open question below.
- [Risk] Introducing routing touches `main.jsx`/`App.jsx`, which every existing section depends on indirectly. → Mitigation: keep the change additive — wrap existing homepage composition in a `/` route with no internal changes to section components themselves.
- [Risk] Placeholder tier data may not match real future tier counts/hour breakpoints, requiring layout rework later (e.g. if a tier needs overflow/pagination). → Mitigation: explicitly deferred as a non-goal; data shape (`items` as an array) doesn't block adding pagination later.

## Migration Plan

1. Add `react-router-dom` dependency.
2. Wrap existing homepage composition in a `/` route inside a router; no changes to existing section internals.
3. Add `prizeTiers.js` placeholder data.
4. Build the `/prizes` page component and route.
5. Update `Prizes.jsx` teaser: replace "and more..." text with a link to `/prizes`.
6. Verify SPA fallback works for direct `/prizes` navigation in the deploy environment.

No data migration or rollback complexity — this is purely additive; reverting means removing the route and dependency.

## Open Questions

- What does this project deploy to (static host config), and does it already support SPA fallback routing for a non-root path like `/prizes`? Needs a one-time check during implementation.
