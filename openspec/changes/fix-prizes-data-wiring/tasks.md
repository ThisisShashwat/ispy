## 1. Confirm scope

- [x] 1.1 Grep the codebase for all imports/references of `data/prizes` to get a complete list of files to update
- [x] 1.2 Confirm `src/app/prizes/page.jsx` is the only consumer of `prizeTiers.js` today (baseline before adding a second)

## 2. Add a highlight export to prizeTiers

- [x] 2.1 In `src/data/prizeTiers.js`, add and export `highlightedPrizes` (or equivalent): derive 3 items from representative tiers (e.g. lowest, a middle, and the highest tier) for the homepage teaser
- [x] 2.2 Ensure each highlighted item has the fields the teaser needs (`name`, `image`, and a label — use tier `codename` or `hours` in place of the old `clearanceLevel`)

## 3. Rewire the homepage teaser

- [x] 3.1 Update `src/components/sections/Prizes.jsx` to import `highlightedPrizes` from `prizeTiers.js` instead of `prizes` from `data/prizes`
- [x] 3.2 Update `PrizeItem`/`DossierPhoto` prop usage in `Prizes.jsx` to match the new item shape (e.g. `label={item.codename}` instead of `label={prize.clearanceLevel}`)
- [ ] 3.3 Verify the teaser still renders exactly 3 cards with the existing grid layout and scroll-reveal animation

## 4. Remove the stale data file

- [x] 4.1 Delete `src/data/prizes.js` once no file imports from it
- [x] 4.2 Re-run the grep from 1.1 to confirm zero remaining references

## 5. Verify

- [x] 5.1 Run the app and visually confirm the homepage teaser shows 3 correct images/items sourced from `prizeTiers.js`
- [x] 5.2 Visually confirm `/prizes` still renders all 5 tiers unaffected
- [x] 5.3 Test the "missing image" fallback path (temporarily break one image path) to confirm `DossierPhoto`'s `IMAGE UNAVAILABLE` state still works with the new data shape

## 6. Fix DossierPhoto image rendering (discovered during verification)

- [x] 6.1 `DossierPhoto.jsx` rendered `<img src={src}>` where `src` is a Next.js static-import object (`{ src, width, height }`), not a string — every image rendered as `src="[object Object]"` regardless of data source. This affected both the homepage teaser and `/prizes`, so it was the actual root cause behind "images aren't rendering."
- [x] 6.2 Unwrap the import object (`src?.src`) before passing to `<img>`, keeping support for plain string paths too
- [x] 6.3 Verified via curl against the dev server: both pages now emit real hashed `/_next/static/media/...` URLs, and all referenced image assets return 200
