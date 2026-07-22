## Context

`src/app/prizes/page.jsx` already renders the full 5-tier catalog correctly from `prizeTiers.js`. `src/components/sections/Prizes.jsx` (the homepage teaser) instead reads a separate, stale file (`src/data/prizes.js`) that was never updated when `prizeTiers.js` was introduced. The fix is narrow: point the teaser at the same source of truth the full page already uses, and decide how the teaser picks a subset to display (the homepage shouldn't show all 9 items — it's a preview that links out to `/prizes` for the full list).

## Goals / Non-Goals

**Goals:**
- Single source of truth (`prizeTiers.js`) for all prize images/content, on both the homepage teaser and the `/prizes` full dossier.
- Homepage teaser continues to show a small curated set (current behavior: 3 items), not the entire catalog.
- No visual/layout regression to the teaser's existing grid of 3 cards.

**Non-Goals:**
- Reworking the `/prizes` full dossier page (already correct).
- Changing the tier data model (`hours`, `codename`, `items[]`) itself.
- Adding an "eye-catching curated" content field to the data (see Decisions below for why this was considered and deferred).

## Decisions

**How the teaser selects which items to show:** derive the 3 highlighted items by taking the first item from three representative tiers (lowest, a middle, and the highest tier), read directly off `prizeTiers`, rather than adding a new `featured: true` flag to the data model.
- Alternative considered: add a `featured` boolean per item in `prizeTiers.js`. Rejected for now — it's more flexible long-term, but adds a data-model change beyond this fix's scope; the "why" trigger for this change is broken wiring, not a request for curation flexibility. Can be revisited later if editors need more control over which 3 show on the homepage.
- Alternative considered: show one item per tier for all 5 tiers on the homepage. Rejected — breaks the existing 3-card layout/design intent of the teaser and duplicates the full dossier's job.

**Where the selection logic lives:** a small derivation directly in `Prizes.jsx` (or a tiny helper co-located with `prizeTiers.js`, e.g. `prizeTiers.js` exporting a `highlightedPrizes` array) rather than a new standalone data file. Keeps one file as the source of truth per the proposal's stated goal.

**Removing `data/prizes.js`:** delete only after confirming no remaining imports (search for `data/prizes` and `from '../../data/prizes'` etc.), to avoid a silent breakage.

## Addendum (discovered during implementation)

Fixing the data wiring alone did not make images render. `DossierPhoto.jsx`, the shared component both the homepage teaser and `/prizes` use to render each image, passed `src` (a Next.js static-import object: `{ src, width, height }`) straight into `<img src={src}>`, producing `src="[object Object]"` for every prize image on both pages — this was the actual cause of "images aren't rendering," independent of which data file fed the component. Fixed by unwrapping `src?.src` in `DossierPhoto.jsx` before rendering. Folded into this change rather than opened separately since it's small, directly blocks this change's own verification step, and touches the same rendering path already in scope.

## Risks / Trade-offs

- [Different item shape between `prizes.js` (flat, has `clearanceLevel`) and `prizeTiers.js` items (has `desc`, no `clearanceLevel`, nested under a tier)] → `PrizeItem` in `Prizes.jsx` passes `label={prize.clearanceLevel}` to `DossierPhoto`; with tier data, use the tier's `codename` (or hours) as the label instead, or omit the label if not meaningful for the teaser.
- [Hardcoding which 3 tiers/items are "featured" means future catalog edits could silently change what's on the homepage] → Acceptable per Decisions above; documented as an Open Question / follow-up rather than solved now.
- [Deleting `data/prizes.js` could break an import missed during review] → Grep for all references before deletion; this is a small enough codebase that a fallback grep is sufficient (no build step to validate against in this repo's tooling).
