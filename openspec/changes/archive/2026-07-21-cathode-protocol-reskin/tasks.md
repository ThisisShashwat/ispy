## 1. Design tokens (Tailwind config)

- [x] 1.1 Replace `manila`/`ink`/`stamp` color tokens with the Cathode Protocol palette (surface, surface-container tiers, primary, secondary, tertiary, on-* pairs, outline) from the supplied design.md
- [x] 1.2 Set JetBrains Mono as the base font family site-wide
- [x] 1.3 Set default border radius to 0px globally (buttons, inputs, cards/modules)
- [x] 1.4 Add the phosphor-glow utility (drop-shadow/text-shadow at ~0.15 opacity green) for primary-colored text and borders
- [x] 1.5 Remove/retire rotation and skew utility usage from the theme where it was only used for the dossier "physical paper" look — also required updating `src/components/EnvelopeIntro.jsx` (uses the removed tokens/rotation directly; not listed in the proposal's Impact section but necessary or the intro screen would render unstyled)

## 2. Global effects

- [x] 2.1 Retune `src/components/ScanlineOverlay.jsx` colors/opacity/blend-mode to the obsidian + matrix-green palette
- [x] 2.2 Verify scanline overlay still does not intercept pointer events (non-interactive, `pointer-events: none` or equivalent preserved)

## 3. DossierPhoto → bracketed file-preview module

- [x] 3.1 Remove the `rotate` prop and rotation/tape/pushpin markup from `src/components/DossierPhoto.jsx`
- [x] 3.2 Restyle the container as a sharp-cornered, bordered module (1px border, obsidian background)
- [x] 3.3 Replace the stamped-corner `label` badge with a `[SECURED]`-style bracketed tag rendered in label-caps typography
- [x] 3.4 Add a `[ FILENAME.EXT ]`-style caption header above/below the image, in label-caps mono
- [x] 3.5 Verify the existing "missing image" fallback state still renders correctly inside the new module framing

## 4. Section components — token/class updates

- [x] 4.1 Restyle `Hero` (headline glow/typography, any dossier-specific classes) — preserve decrypt-in headline animation behavior
- [x] 4.2 Restyle `Marquee`
- [x] 4.3 Restyle `Briefing` — preserve censor-bar reveal behavior, restyle censor bar and revealed-text colors only
- [x] 4.4 Restyle `Arsenal`/`IdeaCard` — convert card to bordered "module" with label-caps header bar + divider, replace shadow/lift hover with border-color hover
- [x] 4.5 Restyle `Prizes` — wire in the updated `DossierPhoto` module styling
- [x] 4.6 Restyle `HowItWorks`
- [x] 4.7 Restyle `CtaFooter`, including button restyle (1px-bordered rectangle, inverted-fill hover state)
- [x] 4.8 Restyle any remaining shared list markup to use `>` (active) / `-` (inactive) bullet markers — no bulleted `<ul>/<li>` list markup exists in the current components (steps/cards use numbering, not bullets), so there was nothing to convert

## 5. Verification

- [x] 5.1 Full-page visual pass at mobile (375px) and desktop (1440px) widths against the reference screenshot — verified via Playwright screenshots (no interactive browser tool available in this session, so a scripted headless pass was used instead); layout stacks cleanly on mobile with no horizontal overflow, and desktop renders the full boxed/bracketed module aesthetic matching the reference
- [x] 5.2 Confirm no section retains tan-manila/black/red-stamp coloring or rotated/taped elements — verified via grep across `src/`, zero hits for `manila`/`ink-*`/`stamp-*`/`rotate-*`/`skew-*`/shadow-lift classes
- [x] 5.3 Confirm all interactive controls (buttons, links) remain clickable through the scanline overlay — both overlay layers keep `pointer-events-none`; CTA links unchanged structurally
- [x] 5.4 Confirm copy, codenames, section order, and prize/program data are unchanged from before the reskin — verified via grep; all headline/body copy, codenames, and CASE FILE labels match pre-reskin text; `data/prizes.js` untouched
