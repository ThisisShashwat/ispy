## Context

Greenfield project — no existing source code, only OpenSpec scaffolding. This is the first build: a single-page React + Tailwind marketing site for the ISpy YSWS program, targeted at students (13-18), with an MI6 dossier / classified case-file visual theme (tan-manila + black + red-stamp — explicitly not a green hacker-terminal look).

## Goals / Non-Goals

**Goals:**
- Ship a fully responsive single-page site that reads as a convincing "classified case file" through production quality, not disclaimer copy.
- Keep prize images trivially swappable by whoever owns the program, without touching component code.
- Implement exactly four gimmicks well rather than stacking more effects that risk jank.
- Keep YSWS funding mechanics in the background — prize-forward copy, not dollar-forward.

**Non-Goals:**
- No backend, no real application form/CTA destination (explicit placeholder).
- No routing/multi-page structure.
- No CMS or admin UI for editing content — content lives in code/data files.
- No account system, analytics, or A/B testing infrastructure.

## Decisions

### Stack: Create React App vs Vite
Use **Vite + React + Tailwind CSS**. Rationale: fast dev server, minimal config overhead for a single static page, no need for CRA's larger surface area or Next.js's routing/SSR features since this is one page with a placeholder CTA. Alternatives considered: Next.js (rejected — no routing/SSR need, unnecessary complexity), CRA (rejected — effectively unmaintained, slower dev loop).

### Prize data: config-driven, not hardcoded JSX
A single `src/data/prizes.js` (or `.ts`) exports an array of `{ id, name, image, clearanceLevel }` objects. The `Prizes` component maps over this array to render cards — no per-prize JSX. Images live under one consistent folder (`src/assets/prizes/`) with obvious filenames (`flipper-zero.jpg`, `monitor.jpg`, `gopro.jpg`) referenced by the data file. Swapping a prize image is either (a) replacing the file at the same path, or (b) changing one `image` field. Rationale: the proposal explicitly calls for "easily replaceable" placeholder images — a data file is the minimal mechanism that satisfies this without building an admin UI.

### Gimmick implementation approach
- **Decrypt-in typewriter headline**: small custom hook (`useDecryptText`) that on mount iterates the target string, temporarily substituting random glyphs before settling each character, via `setInterval`/`requestAnimationFrame`. Runs once on hero mount only — not re-triggered on scroll, to avoid distracting repetition.
- **Redacted censor-bar reveal**: a `Redacted` wrapper component rendering a black bar (`div`) absolutely positioned over child text; bar opacity/width animates away on hover (desktop) and on scroll-into-view via `IntersectionObserver` (so touch users on mobile still get the reveal). Implemented with Tailwind transition utilities, no animation library needed.
- **CRT/scanline overlay**: a fixed-position, `pointer-events-none` overlay `div` with a repeating-linear-gradient background (scanlines) and low opacity, applied once at the page root — not per-section — to keep it cheap and consistent.
- **Dossier-photo styling**: pure CSS/Tailwind — rotated corner "paperclip" pseudo-element or small SVG, a stamped border/corner label, slight rotation per card for a "scattered case file" feel. No JS needed.

All four gimmicks are CSS/lightweight-JS only — no animation library (e.g. Framer Motion) is introduced, keeping bundle size and complexity down for a landing page whose primary job is fast load-to-CTA.

### Color palette
Tailwind theme extension with custom colors: manila/tan background tones (e.g. `#e8dcc0`-family), near-black ink (`#1a1712`-family) for text/borders, and a red stamp accent (`#a3231f`-family) reserved for stamps/accents only (not large fills), so it reads as an accent rather than a competing primary.

### Content structure
Section order per proposal: Hero → Briefing → Arsenal → Prizes → How It Works → CTA/Footer. Each section is its own component under `src/components/sections/` for isolation and easy reordering.

## Risks / Trade-offs

- **[Risk] CRT/scanline overlay hurts readability or looks cheap if overdone.** → Mitigation: keep opacity very low (single-digit %), test against manila background specifically, make it easy to tune/disable via one constant.
- **[Risk] Decrypt-in text effect delays perceived load / hero readability on slow devices.** → Mitigation: cap animation duration (e.g. under ~800ms), ensure final text is present in the DOM immediately (animation is progressive enhancement, not a blocker to content).
- **[Risk] IntersectionObserver-based redacted reveal fires inconsistently across mobile browsers.** → Mitigation: fall back to bars simply being visible-then-fading on a fixed delay if `IntersectionObserver` support/behavior is unreliable; hover remains the primary desktop interaction.
- **[Risk] Placeholder images ship to production accidentally.** → Mitigation: name placeholder files clearly (e.g. `*-placeholder.jpg`) or leave a code comment at the prizes data file noting they need real photos before launch.

## Open Questions

- Exact final copy for briefing/arsenal/how-it-works sections — left for implementation to draft from the YSWS context, not fully scripted here.
- Whether the CTA button eventually links to a form, Slack, or GitHub repo — out of scope for this change (explicitly placeholder).
