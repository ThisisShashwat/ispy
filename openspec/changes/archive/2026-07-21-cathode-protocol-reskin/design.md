## Context

The site is a single-page React app (`src/App.jsx`) styled with Tailwind, currently themed as a paper "spy dossier" (custom `manila`/`ink`/`stamp` color tokens, rotated/taped photo treatments, soft shadows). The `landing-page-layout` spec explicitly requires this tan/black/red palette and explicitly forbids a green-on-black terminal scheme.

The user supplied a reference screenshot and a full `design.md`-style token spec ("Cathode Protocol") describing a retro-terminal/CRT aesthetic: obsidian surfaces, matrix-green primary, amber secondary, JetBrains Mono everywhere, 0px corners, boxed/bordered "modules," ASCII-style dividers, and phosphor-glow text/border effects. The heist/spy copy and content stay unchanged — this is a full visual re-skin, not a content or narrative change.

The one component without a clean 1:1 mapping is `DossierPhoto`: its whole visual logic (rotation, tape nub, stamped corner label) is built around "physical paper," which conflicts with the new brief's rigid, boxed, non-organic look. The resolved direction (confirmed with the user) is to turn it into a bracketed `[ FILENAME.EXT ]` file-preview module with a `[SECURED]` tag, matching the reference screenshot's file-listing pattern.

## Goals / Non-Goals

**Goals:**
- Replace every visual token (color, font, radius, border, shadow/elevation, hover state) with the Cathode Protocol system.
- Preserve all copy, section order, section content, and data-driven structures (prize list, program content) exactly as-is.
- Retune the existing `ScanlineOverlay` component to the new palette rather than rebuilding scanline/CRT behavior from scratch (it already satisfies the `spy-gimmick-effects` "CRT scanline overlay" requirement behaviorally).
- Restyle `DossierPhoto` as a bracketed, sharp-cornered file-preview module.

**Non-Goals:**
- No new sections, routes, or content.
- No change to the decrypt-in headline or censor-bar reveal *behavior* (only their color/typography).
- No change to prize data source, config-driven content, or placeholder-image mechanics.
- Not building a themeable/multi-theme system — this is a one-way swap of the current theme, not a toggle.

## Decisions

**1. Tailwind token replacement, not a parallel theme.**
Replace `manila`/`ink`/`stamp` color keys in the Tailwind config directly with the Cathode Protocol tokens (renamed to semantic keys: `surface`, `primary`, `secondary`, `tertiary`, `on-surface`, etc., per the supplied design.md). Alternative considered: keep old token names and just repoint their hex values. Rejected — the old names (`manila`, `ink`, `stamp`) are paper-metaphor names that would now be misleading/confusing in the codebase, and the supplied spec already defines a clean semantic naming scheme worth adopting directly.

**2. Global JetBrains Mono, no per-section font overrides.**
Set `font-mono` (JetBrains Mono) as the base font family site-wide rather than applying it selectively. The current design already uses `font-mono` for stamps/codenames, so this is an extension of an existing pattern, not a new one.

**3. Remove rotation/skew utilities as a class, don't reskin them.**
Any `rotate-*`/`skew-*` classes tied to the "physical paper" feel (tape nubs, tilted photos, angled stamps) are removed rather than restyled in place, since organic tilt directly conflicts with "Sharp (0px) corners... avoid rounded corners entirely... any sense of softness comes from glow, not geometry." Alternative considered: keep slight rotation for visual interest. Rejected per the supplied brief's explicit brutalist/rigid-grid intent, and because the reference screenshot shows no rotated elements anywhere.

**4. `DossierPhoto` becomes a bracketed file-preview module, not a new component.**
Restructure the existing component in place (same prop surface: `src`, `alt`, `label`, `width`; drop `rotate` prop since rotation is removed) rather than introducing a new component, to minimize call-site churn across `Prizes` and any other consumers. The `label` prop now renders as a `[SECURED]`-style tag in the module header instead of a stamped corner badge.

**5. `ScanlineOverlay` gets a palette/opacity retune, not a rewrite.**
Its existing behavioral contract (non-interactive, page-wide, subtle) already matches the `spy-gimmick-effects` CRT requirement. Only its visual output (line color tinted green, opacity/blend mode tuned to the new dark obsidian background) changes.

**6. Buttons: inverted-fill hover, not shadow/lift.**
Replace the current `hover:shadow-xl hover:-translate-y-1` interaction pattern with the supplied spec's inverted state (background fills with primary color, text flips to background color) for buttons specifically. Cards/modules keep a hover affordance but via border-color change (e.g. to `outline`/primary) rather than lift+shadow, since shadows aren't part of this elevation system (elevation = tonal layering + border doubling, not shadows).

## Risks / Trade-offs

- **[Risk]** Removing rotation/shadow utilities site-wide touches every section component, increasing diff size and regression surface for a purely visual change. → **Mitigation**: tasks.md sequences this file-by-file with the token/Tailwind-config change landing first, so each component change is a mechanical class swap against a already-correct palette, not simultaneous design + implementation.
- **[Risk]** JetBrains Mono at body-text sizes with "generous line-height" may hurt readability for longer copy blocks (e.g. `Briefing`, `HowItWorks` descriptions) compared to the current dossier body font. → **Mitigation**: use the supplied `body-lg`/`body-sm` type scale as specified and visually check longer text blocks during implementation; this is a subjective call the user can override if it reads poorly in practice.
- **[Risk]** The `landing-page-layout` spec currently *forbids* green-on-black terminal styling outright — shipping this change without updating that spec leaves the specs and implementation contradictory. → **Mitigation**: this change's specs artifact updates that requirement directly (see delta spec), so the contradiction is resolved as part of this change, not left dangling.
- **[Trade-off]** Dropping the "physical evidence" framing (tape, rotation, stamps) for prize photos in favor of bracketed file-previews changes what the photos *represent* narratively (evidence photo → exfiltrated data file). This is intentional per the reskin's medium shift (paper dossier → hacked terminal) and was confirmed with the user, but is a bigger perceptual change than a color swap.

## Migration Plan

1. Land Tailwind config token/typography/radius changes first (no visual regressions yet if old class names still reference now-renamed tokens — those will simply error/fallback, making missed spots easy to find via build/lint).
2. Update `ScanlineOverlay` palette.
3. Restyle `DossierPhoto`.
4. Restyle section components in page order (`Hero` → `Marquee` → `Briefing` → `Arsenal` → `Prizes` → `HowItWorks` → `CtaFooter`), each a self-contained, visually-checkable step.
5. Full-page visual pass (desktop + mobile) against the reference screenshot and the existing `landing-page-layout` responsive requirements.
6. No rollback complexity beyond reverting the branch — no data migration, no external dependencies added.

## Open Questions

- None outstanding — DossierPhoto treatment, copy retention, and full-vs-partial reskin scope were all resolved with the user before this design was written.
