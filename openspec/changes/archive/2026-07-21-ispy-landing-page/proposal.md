## Why

ISpy needs a public-facing landing page to recruit students into the program. There is currently no website — students learning about ISpy have no place to see the premise, example project ideas, prizes, or a way to apply. The page needs to sell the program's fun, slightly rebellious "build something that could spy on someone" premise while still reading as a legitimate Hack Club YSWS, and it needs to exist before any real recruiting push can happen.

## What Changes

- New single-page React + Tailwind CSS site (`ispy-landing-page`) with an MI6 dossier / classified case-file visual theme (tan-manila + black + red-stamp palette).
- Hero section with a decrypt-in typewriter headline effect and a placeholder "apply" CTA.
- Briefing section translating the YSWS ship-to-earn mechanic into spy-program terms, prize-forward rather than dollar-forward.
- Arsenal section listing illustrative (non-exhaustive) example project ideas spanning the deliberately broad scope (software keylogger, hidden-camera robot, network sniffer, OSINT tool, etc.).
- Prizes section showing exactly 3 items (Flipper Zero, monitor, GoPro) styled as dossier/evidence photos, sourced from a small swappable data file pointing at placeholder images in one consistent asset folder.
- "How it works" section explaining ship → get rewarded, simplified from the underlying weighted-project funding formula.
- Site-wide gimmicks: redacted censor-bar text reveal (hover/scroll-into-view) and a subtle CRT/scanline overlay.
- Fully responsive layout, mobile through desktop.
- Footer/closing CTA repeating the placeholder apply action.

## Capabilities

### New Capabilities
- `landing-page-layout`: The single-page structure, section order, responsive behavior, and overall dossier visual theme (palette, typography, textures) that hosts all other content.
- `spy-gimmick-effects`: The four interactive/visual gimmicks — decrypt-in headline typewriter, redacted censor-bar reveal, CRT/scanline overlay, and dossier-photo styling — as reusable presentation behavior.
- `prize-showcase`: The swappable prize data model (name, image, clearance level) and the 3-item dossier-styled display of Flipper Zero, monitor, and GoPro.
- `program-content`: The YSWS-derived copy content — briefing/what-is-ISpy, arsenal example project ideas, and simplified how-it-works — and the placeholder CTA that appears in the hero and footer.

### Modified Capabilities
(none — greenfield project, no existing specs)

## Impact

- Affected code: entirely new `src/` React app (components, prize data file, placeholder assets under a dedicated prizes asset folder), Tailwind config/theme for the tan/black/red palette.
- No backend, no real CTA destination yet (explicitly placeholder).
- No existing specs modified; this is the first capability set for the project.
