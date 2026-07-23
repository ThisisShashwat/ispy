## Context

`src/app/dashboard/page.jsx` is a server component (from `add-submission-dashboard`) that fetches identity/Hackatime data and renders a fixed header ("CASE FILE — AGENT DASHBOARD" eyebrow, "Submit a project" heading) followed by `<DashboardClient>`, the 3-step submission form. Eligibility criteria currently live only on the homepage, split across two components with two different tones:
- `Briefing.jsx`: mission-style prose ("design and build a real, working piece of surveillance tech... ship it publicly").
- `HowItWorks.jsx`: a 4-step narrative (`choose target` → `build it for real` → `ship it publicly` → `get rewarded`), each step carrying a `desc` string, including the hardware-exception carve-out in step 02.

Both are written to persuade a first-time visitor to join, not as a quick reference for someone already authenticated and mid-submission.

## Goals / Non-Goals

**Goals:**
- Give `/dashboard` its own concise, rule-form statement of what counts as an eligible project, visible before the submission header.
- Match the homepage's established `CASE FILE 00X` eyebrow + glitch-title heading visual pattern, so the new section reads as a natural extension of the site's existing design language.
- Keep the section fully static (no client state, no data fetching) and free of any prize/tier/hours language.

**Non-Goals:**
- Not a rewrite of the homepage's `Briefing`/`HowItWorks` copy — those stay as-is; this is a new, independently-worded surface for a different audience (authenticated users mid-task vs. first-time visitors).
- Not a restatement of reward mechanics — hours/prize eligibility is already communicated later in `DashboardClient`'s step 2 ("Pick your prize — X tracked hours") and is intentionally out of scope here.
- Not a shared/single-sourced content module with the homepage (see Decisions below).

## Decisions

**Independent paraphrase, not shared data source.** The homepage's `steps` array (`HowItWorks.jsx`) and `Briefing.jsx`'s prose are narrative/persuasive by design; the dashboard section is a terse rule list for a different audience and reading context. Extracting a shared `src/data/` constant would force both surfaces into a single tone and couple unrelated components (a homepage marketing section and an authenticated app page) for a three-bullet list that's unlikely to change often. Plain, separately-maintained copy in both places is simpler and keeps each component's content ownership clear. If the criteria change materially in the future, both spots need a manual edit — an accepted trade-off given how rarely this text should change.

**New heading identity, not the `/prizes` dashed-box style.** `PrizesPage.jsx`'s dashed-border callout (`border-outline-variant border-dashed`) is a static aside *within* a page whose main heading is something else ("The Reward Ledger"). Here, the eligibility content is the first thing on the page, ahead of the existing dashboard header — so it gets a first-class eyebrow + `glitch-title` heading (matching `Briefing.jsx`/`HowItWorks.jsx`'s pattern: `font-mono ... tracking-[0.3em]` eyebrow, `glitch-title text-3xl sm:text-4xl font-bold` heading), rather than being visually subordinate as a boxed note.

**Rendered in the server component, not `DashboardClient`.** The content is static markup with no dependency on `profile`, `projects`, or any client state — it belongs in `src/app/dashboard/page.jsx` alongside the existing header, above the `<DashboardClient>` call, keeping `DashboardClient.jsx`'s responsibility scoped to the interactive form.

**Exactly three bullets, no more.** Confirmed scope: (1) real/working, not a mockup, (2) shipped publicly (repo/build/hardware demo), (3) hardware exception on "fully working." No fourth bullet about rewards/hours — that would duplicate what step 2 of the form already shows live.

## Risks / Trade-offs

- **Copy drift** → the homepage and dashboard eligibility text can diverge in wording (and, if unmaintained, in substance) since they aren't shared. Mitigated by keeping the dashboard version intentionally short (3 bullets) so it's cheap to eyeball against the homepage during future edits.
- **New heading hierarchy on the page** → adding a second `glitch-title`-style heading above the existing "Submit a project" `h1` needs a visual/semantic pass (e.g. deciding heading levels) so the page doesn't read as having two competing `h1`s. Addressed in tasks as an explicit check.
