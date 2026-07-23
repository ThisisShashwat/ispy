## 1. Content

- [x] 1.1 Write the three eligibility bullets (real/working, shipped publicly, hardware exception) as concise, independent copy — not copied verbatim from `Briefing.jsx`/`HowItWorks.jsx`
- [x] 1.2 Decide final eyebrow label (e.g. "CASE FILE — ELIGIBILITY") and heading text (e.g. "What Counts")

## 2. Dashboard page section

- [x] 2.1 Add the eligibility-summary section to `src/app/dashboard/page.jsx`, rendered above the existing "CASE FILE — AGENT DASHBOARD" eyebrow and "Submit a project" heading
- [x] 2.2 Style the eyebrow and heading to match the homepage's `CASE FILE 00X` pattern (mono tracked-letter eyebrow, glitch-title heading), without reusing `PrizesPage.jsx`'s dashed-border callout style
- [x] 2.3 Render the three bullets as a simple list beneath the heading
- [x] 2.4 Resolve heading hierarchy so the page doesn't present two competing top-level headings (e.g. eligibility section uses `h2`, existing "Submit a project" stays `h1`, or equivalent adjustment)

## 3. Verification

- [x] 3.1 Confirm the section contains no mention of prizes, tiers, or hours
- [x] 3.2 Confirm the section renders above `DashboardClient` and does not depend on `profile`/`projects` props
- [x] 3.3 Visually check `/dashboard` against the homepage sections for styling consistency
