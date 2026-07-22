## Why

The homepage teaser (`src/components/sections/Prizes.jsx`) renders from `src/data/prizes.js`, a stale 3-item list (Flipper Zero, monitor, GoPro) with placeholder-era images. The full `/prizes` dossier page (`src/app/prizes/page.jsx`) already correctly consumes the newer 5-tier catalog, `src/data/prizeTiers.js` (9 images across keychain, macropad, domain grant, watch, monitor, flipper, GoPro, and laptop) — so that data source and its images are proven to work. `data/prizes.js` was simply never updated or retired after `prizeTiers.js` was introduced, leaving the homepage showing outdated items and images that don't match the full dossier.

## What Changes

- Repoint the homepage teaser (`Prizes.jsx`) to pull its highlighted items from `prizeTiers.js` instead of the stale `data/prizes.js`, selecting a small representative subset (e.g., one item per tier, or the top N tiers) rather than every item across all tiers.
- Remove `src/data/prizes.js` once `Prizes.jsx` no longer references it, consolidating on `prizeTiers.js` as the single prize data source.
- Update the `prize-showcase` spec (which currently governs the homepage teaser) to describe a tier-derived highlight selection instead of a fixed 3-item list.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `prize-showcase`: Replace "fixed 3-item list" requirement with a requirement that the homepage teaser derives its displayed items from `prizeTiers.js` (the same source as the full dossier page), rather than maintaining a separate, independently-edited data file. Config-driven and swappable-image requirements carry over but now apply to `prizeTiers.js`.

## Impact

- `src/components/sections/Prizes.jsx` — data source and rendering logic (homepage teaser only)
- `src/data/prizeTiers.js` — becomes the single live data source for both teaser and full dossier
- `src/data/prizes.js` — removed
- `src/app/prizes/page.jsx` — unaffected (already correct), used as reference for the fix
- `openspec/specs/prize-showcase/spec.md` — requirements updated
