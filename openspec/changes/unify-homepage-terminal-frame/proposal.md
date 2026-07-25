## Why

The homepage currently wraps each of its six sections in its own separate `TerminalPane`, each with its own title bar, border, and padding, stacked with gaps between them. This reads as six independent boxed "cards" reskinned with terminal chrome rather than one cohesive terminal experience, which is the generic, templated feeling we want to move away from. Reworking the homepage into a single terminal frame that the whole page scrolls inside of (in the style of retro single-window sites like widget.hackclub.com) makes the metaphor structural instead of decorative.

## What Changes

- **BREAKING**: Replace the six independent `TerminalPane` wrappers (one per section) with a single page-wide terminal frame that contains all homepage content. The frame's title bar and window controls scroll with the page (not fixed/sticky) and appear once, at the top of the page.
- Section content (hero, briefing, arsenal, prizes, how it works, CTA/footer) remains grouped into the same distinct visual chunks as today, separated by dividers, inside the one shared frame — not merged into a single undifferentiated scroll or rewritten as a literal command-transcript.
- Existing per-section layouts and content (e.g. Arsenal's card grid, Prizes' dossier photos) are kept as-is; only the outer pane-per-section chrome is removed.
- Remove per-section terminal identities in the title bar (`root@ispy:./boot.sh`, `cat case_file_001.md`, etc.) in favor of one identity for the whole page's single title bar.
- Remove the per-pane close-attempt escalation gag (shared attempt counter, tiered refusal messages) — out of scope for this change. Window controls (minimize/maximize/close) become simple non-functional decoration on the single frame, or are dropped if a single set of controls doesn't fit the new layout.
- The Hero section's persistent "boot sequence" framing (boot log lines, decrypt animation) is kept as in-page content but is no longer tied to its own pane's chrome.
- Marquee placement relative to the new single frame is preserved from current behavior unless implementation finds a reason to move it.

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `terminal-window-chrome`: Chrome moves from one pane per section to a single page-wide frame; per-section identities, tiled multi-pane layout, and close-attempt escalation requirements are removed or replaced with single-frame equivalents. Anchor ids move from per-pane to per-content-section.

## Impact

- `src/components/TerminalPane.jsx`: becomes (or is replaced by) a single page-level frame component instead of a per-section wrapper.
- `src/app/page.jsx`: wraps all sections in the one frame instead of each section wrapping itself.
- `src/components/sections/*.jsx` (Hero, Briefing, Arsenal, Prizes, HowItWorks, CtaFooter): drop their individual `<TerminalPane>` wrapper and per-section title-bar `path`/`host`/`idle` props.
- `src/components/context/CloseAttemptContext`: escalation-gag logic is no longer wired into the new frame; this change does not need to preserve or migrate it.
- `openspec/specs/terminal-window-chrome/spec.md`: requirements rewritten for a single-frame model.
