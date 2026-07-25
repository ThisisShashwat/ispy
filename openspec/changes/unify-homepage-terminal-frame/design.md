## Context

The homepage (`src/app/page.jsx`) currently renders six sections (Hero, Marquee, Briefing, Arsenal, Prizes, HowItWorks, CtaFooter), and five of the six content sections each wrap themselves in their own `<TerminalPane>` (`src/components/TerminalPane.jsx`). Each `TerminalPane` renders its own title bar (`host:~$ path`), its own three window-control glyphs, and its own bordered box. The result is six visually separate "windows" stacked with gaps between them.

The reference model (widget.hackclub.com) uses one OS-window-style frame for the entire page: one title bar/chrome element at the top, and all page content lives inside that single frame as the user scrolls. The frame scrolls with the page rather than staying fixed.

## Goals / Non-Goals

**Goals:**
- One terminal frame (one title bar, one set of window controls) wraps the entire homepage instead of six.
- The frame scrolls with the page — no fixed/sticky positioning, no internal fixed-height scroll region.
- Existing section content and layouts (card grids, dossier photos, etc.) are preserved as-is; only the per-section pane wrapper is removed.
- Sections remain visually distinguishable from one another inside the shared frame (via dividers), not merged into one undifferentiated block or rewritten as a literal `$ command` transcript.

**Non-Goals:**
- Preserving per-section terminal identities in the title bar.
- Preserving the close-attempt escalation gag (shared counter + tiered refusal messages) — explicitly out of scope for this change.
- Rewriting section content as literal terminal command output (e.g. styling Arsenal as raw `ls -la` text rows).
- Changing section order, copy, or the underlying Cathode Protocol color palette — `landing-page-layout` requirements are unaffected.

## Decisions

**One frame component wraps `<main>` in `page.jsx`, not each section.**
`TerminalPane` currently takes per-section props (`id`, `host`, `path`, `idle`) and is invoked once per section file. It's repurposed into a single page-level frame: `page.jsx` renders one frame component around all six sections; the individual section components (`Hero.jsx`, `Briefing.jsx`, etc.) drop their own `<TerminalPane>` wrapper and just return their inner content. Section files keep their own `id` on a plain wrapper element (e.g. `<section id="hero">`) so in-page anchors still work per `terminal-window-chrome`'s existing anchor requirement.

*Alternative considered*: keep `TerminalPane` as a per-section component and add a second, outer "meta-frame" around all of them (nested chrome). Rejected — this produces double chrome (an outer title bar and inner vestigial borders) and doesn't match the reference's single-frame simplicity.

**Frame scrolls with content; no fixed positioning.**
Per the user's explicit call, the title bar is not sticky/fixed and there is no internal `overflow-y: auto` scroll region — the frame is normal document flow, so the browser's native scrollbar and scroll behavior (anchors, scroll-reveal hooks) keep working unchanged.

**Sections stay as divided chunks inside the frame, not a command transcript.**
Between each section, use a simple horizontal divider (border-top, consistent with the existing `border-outline`/`border-dashed` tokens already used elsewhere, e.g. in `Arsenal.jsx`'s card headers) instead of a gap + separate box. No per-section `$ command` prompts are introduced.

**Single title bar identity, no per-section identity.**
The frame shows one static identity (e.g. `agent@ispy:~$ ./ispy.sh`) rather than a title that changes per scroll position. Content that previously lived in a section's title bar (like Hero's `idle` "awaiting command" state) is dropped; Hero's boot-log lines already exist as in-page content (`BOOT_LOG` array rendered inside the section) and are unaffected by this change.

**Window controls become purely decorative; close-attempt escalation is not carried over.**
Minimize and maximize stay inert (already true today). Close also becomes inert — no `CloseAttemptContext`, no shake animation, no refusal message. The single frame either omits the close button's click handler entirely or keeps it present but no-op. `CloseAttemptContext` and its provider are left in place but unused by the new frame; deleting that infrastructure is out of scope for this change (low cost to leave unused, avoids scope creep into unrelated files).

## Risks / Trade-offs

- **Losing per-section title-bar flavor** (`cat case_file_001.md`, `ls -la ./arsenal/`, etc.) removes some personality that reviewers may miss → Mitigation: the proposal explicitly accepts this trade (user confirmed "replace the per-section personality, don't care"); dividers plus in-content kicker labels (`CASE FILE 001 — BRIEFING`, already present in each section) preserve most of the file/case-file flavor without needing per-section chrome.
- **Single long frame with no fixed title bar means the "you're inside a terminal" cue disappears once scrolled past the top** → Mitigation: accepted per user's explicit choice (frame scrolls with content); not treated as a defect.
- **`CloseAttemptContext` becomes dead code** (provider still mounted, nothing consumes it) → Mitigation: acceptable for this change; flag as cleanup candidate for a future change rather than doing it here.

## Migration Plan

1. Update `terminal-window-chrome` spec (delta in this change) to describe the single-frame model.
2. Rework `TerminalPane.jsx` (or add a new page-level frame component) to render one title bar + controls around arbitrary children, dropping per-section props it no longer needs.
3. Update `page.jsx` to wrap all sections in the one frame.
4. Update each section component to drop its own `<TerminalPane>` wrapper, keeping its `id` and content.
5. Add divider styling between sections.
6. Verify anchors, scroll-reveal hooks (`useRevealOnScroll`), and responsive layout still work unchanged.

No data migration or rollback concerns — this is a presentation-only change to one page.

## Open Questions

- Should the close button be removed entirely from the single frame, or kept but fully inert (no handler)? Leaning toward: keep it visually (matches the OS-window aesthetic of the reference image) but make it a no-op — final call left to implementation.
