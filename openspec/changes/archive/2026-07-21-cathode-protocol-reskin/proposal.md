## Why

The current dossier (tan-manila/ink/red-stamp) visual theme is being replaced with a "Cathode Protocol" retro-terminal/CRT aesthetic to give the heist narrative a hacker-mainframe medium instead of a paper-evidence medium. The spy/heist copy and narrative structure stay exactly as they are — only the visual system changes.

## What Changes

- Replace the Tailwind color tokens (`manila`, `ink`, `stamp`) with the Cathode Protocol palette (obsidian surfaces, matrix-green primary, amber secondary, bright-white tertiary) defined in the supplied `design.md` tokens.
- Switch all typography to JetBrains Mono, apply all-caps to primary navigation/headers, and add the phosphor-bloom text-shadow/glow treatment to primary-colored text and borders.
- Flatten all shapes to 0px corners; remove rotation/skew/tape/pushpin treatments site-wide (they read as "physical paper," which conflicts with the rigid, boxed CRT-terminal look).
- Restyle containers as bordered "modules" with a label-caps header bar and ASCII-style divider, replacing soft-shadow card styling.
- Restyle buttons as rectangular 1px-bordered boxes with an inverted (fill + flipped text color) hover state, replacing the current shadow/lift hover.
- Restyle lists to use `>` (active) / `-` (inactive) bullet markers.
- Retune `ScanlineOverlay` for the CRT palette (green-tinted scanlines/phosphor glow) rather than removing it — the page-wide scanline requirement already exists and is being restyled, not reintroduced.
- **BREAKING (spec-level)**: Remove/replace the `landing-page-layout` requirement that explicitly forbids a green-on-black terminal color scheme — the new palette is exactly that.
- Replace `DossierPhoto`'s rotated/taped Polaroid treatment with a bracketed file-preview module (`[ FILENAME.EXT ]` framing with a `[SECURED]` tag and label-caps caption), matching the reference screenshot's file-listing pattern. Applies to the prize images currently using the "dossier-photo prize styling" requirement.
- Keep all copy, codenames, section content, section order, and data-driven prize/program content structure unchanged.

## Capabilities

### New Capabilities
(none — this is a visual restyle of existing capabilities, not new user-facing behavior)

### Modified Capabilities
- `landing-page-layout`: The "Dossier visual theme" requirement changes from a tan/black/red palette (with an explicit ban on green-on-black terminal styling) to the Cathode Protocol obsidian/matrix-green/amber palette with JetBrains Mono typography and 0px-radius boxed layout.
- `spy-gimmick-effects`: The "Dossier-photo prize styling" requirement changes from a stamped-corner/clip evidence-photo treatment to a bracketed `[SECURED]` file-preview treatment. The "CRT scanline overlay" requirement's visual tuning changes to match the new palette (its behavioral contract — subtle, non-interactive-blocking — is unchanged). "Decrypt-in hero headline" and "Redacted censor-bar reveal" requirements are unchanged in behavior, restyled only in color/typography.

## Impact

- Tailwind theme config (color tokens, font family, border radius).
- `src/components/ScanlineOverlay.jsx` (palette retune).
- `src/components/DossierPhoto.jsx` (structural restyle: bracketed file-preview instead of rotated/taped photo).
- All section components under `src/components/sections/` (`Hero`, `Marquee`, `Briefing`, `Arsenal`, `Prizes`, `HowItWorks`, `CtaFooter`) — token and component-class updates only, no structural/content changes.
- No changes to routing, data sources, or copy/content.
