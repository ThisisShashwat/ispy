## 1. Project setup

- [x] 1.1 Scaffold Vite + React project at repo root (or `app/` if a subfolder is preferred)
- [x] 1.2 Install and configure Tailwind CSS
- [x] 1.3 Extend Tailwind theme with tan-manila, near-black ink, and red-stamp accent color tokens
- [x] 1.4 Set up base project structure: `src/components/sections/`, `src/components/`, `src/data/`, `src/assets/prizes/`

## 2. Prize data and assets

- [x] 2.1 Create `src/data/prizes.js` exporting the 3-item array: Flipper Zero, monitor, GoPro (`{ id, name, image, clearanceLevel }`)
- [x] 2.2 Add 3 placeholder images to `src/assets/prizes/` with clear filenames (`flipper-zero-placeholder.svg`, `monitor-placeholder.svg`, `gopro-placeholder.svg` — SVG used in place of JPG since binary photo assets aren't available yet; swap mechanism is identical)
- [x] 2.3 Wire prize data file image paths to the placeholder assets

## 3. Shared gimmick components

- [x] 3.1 Build `useDecryptText` hook (glyph-scramble-to-final-text animation, bounded duration, respects reduced-motion)
- [x] 3.2 Build `Redacted` wrapper component (censor bar, hover reveal, IntersectionObserver scroll-into-view reveal with fallback)
- [x] 3.3 Build page-root CRT/scanline overlay component (`pointer-events-none`, low opacity, fixed position)
- [x] 3.4 Build dossier-photo styling treatment (stamped corner / clip visual) as a reusable wrapper or utility class

## 4. Section components

- [x] 4.1 Build Hero section: decrypt-in headline using `useDecryptText`, placeholder apply CTA
- [x] 4.2 Build Briefing section: YSWS-in-spy-terms explainer copy, prize-forward not dollar-forward
- [x] 4.3 Build Arsenal section: illustrative example project ideas (keylogger, hidden-camera robot, network sniffer, OSINT tool, etc.)
- [x] 4.4 Build Prizes section: map over `prizes.js` data, render 3 dossier-styled cards using the dossier-photo treatment
- [x] 4.5 Build How-It-Works section: simplified ship-to-reward explanation, no raw dollar/hour figures
- [x] 4.6 Build CTA/Footer section: placeholder apply CTA matching hero CTA styling

## 5. Page assembly and theming

- [x] 5.1 Assemble all sections into single page in required order: hero, briefing, arsenal, prizes, how it works, CTA/footer
- [x] 5.2 Apply tan/black/red dossier palette consistently across all sections (no green-terminal styling)
- [x] 5.3 Apply `Redacted` component to select copy in briefing/arsenal sections per design
- [x] 5.4 Mount CRT/scanline overlay at page root

## 6. Responsiveness and polish

- [x] 6.1 Verify and adjust layout at mobile viewport widths (stacked sections, no horizontal scroll, no clipped content) — verified via Playwright at 375x812, no overflow
- [x] 6.2 Verify and adjust layout at tablet and desktop viewport widths (e.g. multi-column prize grid on desktop) — verified via Playwright at 1440x900, 3-col prize grid, no overflow
- [x] 6.3 Verify scanline overlay does not block clicks/interaction on any control — verified via Playwright click on CTA
- [x] 6.4 Verify redacted reveal works via hover on desktop and scroll-into-view on mobile/touch — verified via Playwright scrollIntoViewIfNeeded triggering opacity:0 on censor bars; hover path uses same underlying state
- [x] 6.5 Verify missing/broken prize image does not break card layout — added onError fallback in DossierPhoto rendering "IMAGE UNAVAILABLE" placeholder with name/label intact

## 7. Review pass

- [x] 7.1 Confirm exactly 3 prize cards render (Flipper Zero, monitor, GoPro) and no more/fewer — verified via Playwright (prizeCount: 3)
- [x] 7.2 Confirm both hero and footer CTAs are present and clearly placeholder (non-functional destination) — both use href="#"
- [x] 7.3 Confirm decrypt-in headline animation completes within ~1 second and final text is present even if animation is skipped — 700ms duration, reduced-motion sets final text immediately, verified rendered text is "ISPY"
- [x] 7.4 Cross-check rendered copy against specs/program-content for dollar-figure leakage — grepped section copy for $/85/8.50/weighted, no matches
