## Why

Right now the page reads as "a webpage styled with terminal colors" — sections are plain bordered `<div>`s stacked in a scroll. The goal is to make it read as "a screenshot of a hacker's terminal setup": each section becomes its own terminal-emulator pane with real chrome (title bar, fake window controls, a per-section process identity), tiled/stacked in a window-manager layout. This also finishes a commitment the Cathode Protocol design system already made but never built: `design.md`'s layout section calls for a "tiled Window Manager effect," which the prior reskin didn't literally implement.

## What Changes

- Wrap every section (`Hero`, `Briefing`, `Arsenal`, `Prizes`, `HowItWorks`, `CtaFooter`) in terminal-pane chrome: a title bar showing a `user@host:path$`-style identity, and fake window controls (`[-][□][x]`).
- Give each section a distinct per-section terminal identity/process name reflecting its content (e.g. `Hero` → `boot.sh`, `Briefing` → `cat case_file_001.md`, `Arsenal` → `ls -la ./arsenal/`, `Prizes` → `./reward_shop.py --tier`, `HowItWorks` → `man protocol`, `CtaFooter` → an idle `awaiting command...` prompt).
- `Hero` stays in a persistent "booting" state — it does not settle into a steady-state prompt after the decrypt-in headline animation finishes.
- Restyle `Marquee` as a taskbar-shaped strip (visual only in this change — no click targets or navigation yet), so it's structurally ready to become the real navigation surface in a future change without being rebuilt.
- Add a non-functional close-button (`[x]`) interaction: clicking it never closes the pane. Instead it triggers a visible refusal (shake + a terminal-styled refusal message) with a **global, page-wide escalation counter** — repeated close attempts across any/all panes escalate the same running joke, get funnier/more dramatic with each attempt.
- Minimize (`[-]`) and maximize (`[□]`) controls are present for visual completeness but are inert — no click handler, no easter egg, no visible reaction.
- Panes are tiled/stacked in normal document flow (matching the existing single-column-mobile / tiled-desktop-grid layout already specified), not absolutely-positioned or draggable overlapping windows.
- Each pane gets a stable anchor id (matching its process identity, e.g. `#arsenal`) so a future navigation change can link to them without renaming or restructuring.
- Real navigation (clickable taskbar, jump-to-section links) is explicitly **out of scope** for this change — this change is chrome + the close-button easter egg only.

## Capabilities

### New Capabilities
- `terminal-window-chrome`: Section-level terminal pane chrome (title bar, per-section identity, fake window controls), tiled pane layout, and the non-functional close-button easter egg with global escalation.

### Modified Capabilities
(none — existing `landing-page-layout` and `spy-gimmick-effects` requirements remain valid as written; this change adds a new layer of structure on top rather than changing their behavior)

## Impact

- All section components under `src/components/sections/` (`Hero`, `Briefing`, `Arsenal`, `Prizes`, `HowItWorks`, `CtaFooter`) — each gets wrapped in new terminal-pane chrome.
- `src/components/Marquee.jsx` — restyled to a taskbar-shaped strip, behavior unchanged (still non-interactive).
- New shared component(s) for the terminal pane chrome (title bar + window controls) and the escalation/easter-egg logic, to avoid duplicating chrome markup across six sections.
- No changes to routing, data sources, or copy/content beyond the new per-section terminal identity labels.
- No navigation/anchor-linking behavior is added in this change (explicitly deferred).
