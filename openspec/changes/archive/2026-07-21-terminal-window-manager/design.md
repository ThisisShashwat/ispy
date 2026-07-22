## Context

The page currently renders as a sequence of full-bleed `<section>`s, each styled with Cathode Protocol tokens (borders, green/amber accents, JetBrains Mono) but structurally just a themed `<div>`. The Cathode Protocol `design.md` already committed to a "tiled Window Manager effect" for desktop layout, but the reskin that shipped it never built literal window chrome — sections are colored, not "windowed."

This change adds that missing layer: each section becomes a terminal-emulator pane (title bar + fake window controls + a per-section process identity), tiled/stacked in reading order. It also adds one interaction detail — a non-functional close button with an escalating, page-wide refusal joke — as the first (and, for this change, only) interactive behavior tied to the new chrome.

Real navigation (a clickable taskbar linking to each pane) is explicitly deferred to a future change. This design still needs to leave that door open cheaply: stable per-pane anchor ids now, and `Marquee` restyled to a taskbar *shape* now, so that future change is "add click handlers and swap copy," not "invent a taskbar and rewrite Marquee."

## Goals / Non-Goals

**Goals:**
- Every section pane has real terminal chrome: `user@host:path$`-style title bar + `[-][□][x]` controls.
- Each section has a distinct fake process identity tied to its content (not generic/interchangeable chrome).
- `Hero` reads as mid-boot permanently, not just during its initial animation.
- Clicking `[x]` on any pane never closes anything, always visibly refuses, and escalates a single shared joke across the whole page regardless of which pane's close button was clicked.
- `Marquee` becomes taskbar-shaped now, without becoming interactive yet.
- Every pane's structure supports being linked to later without rework (stable anchor id).

**Non-Goals:**
- No real navigation, taskbar click-through, or anchor-jumping in this change.
- No draggable/overlapping/absolutely-positioned desktop-style windows — panes stay in normal tiled/stacked document flow, consistent with the existing mobile single-column / desktop tiled-grid requirement.
- `[-]` (minimize) and `[□]` (maximize) get no behavior or easter egg — visual only.
- No change to section copy/content, data sources, or section order.

## Decisions

**1. A shared `TerminalPane` wrapper component, not per-section chrome markup.**
Each of the six sections gets wrapped in one shared component (title bar, controls, optional command-line flavor text) parameterized by `host`, `path`/command string, and an anchor id, rather than duplicating title-bar markup six times. Alternative considered: hand-roll chrome in each section file. Rejected — six near-identical copies of title-bar markup is exactly the kind of duplication a shared component avoids, and centralizing it means the close-button behavior only needs to be implemented once.

**2. Global escalation state lives above the panes, not inside `TerminalPane`.**
The attempt counter is page-level state (lifted to `App` or a small context/provider wrapping `main`), not local to each pane — because the requirement is explicitly that clicking close on *any* pane advances the *same* counter. `TerminalPane` calls a shared `onCloseAttempt()` handler and receives back which message tier to show; it does not own the count itself. Alternative considered: per-pane local counters. Rejected outright — proposal explicitly calls for global escalation, and per-pane counters would contradict "mash different panes' buttons and the joke still escalates."

**3. Escalation tiers are discrete message steps, not a continuously scaling counter.**
Concrete tiers for this change:
| Attempts | Message |
|---|---|
| 1 | `bash: close: permission denied — agent status: ACTIVE` |
| 2–3 | `NICE TRY. THIS TERMINAL DOES NOT DISCONNECT.` |
| 4–6 | `INCIDENT LOGGED. STOP CLICKING THAT.` |
| 7+ | `AGENT DISPATCHED. (still not closing.)` — stays on this final tier for all further attempts, does not keep counting indefinitely |

Each refusal is paired with the pane doing a brief shake (reusing the existing `glitchShift` keyframe from the Cathode Protocol theme) and the message rendering as a line of terminal output under that pane's title bar, styled in the secondary/amber token (matches the palette's existing "amber = warnings" convention), auto-clearing after a few seconds.

**4. Panes stay in normal flow; "tiled window manager" means CSS grid/stacking, not absolute positioning.**
This matches the proposal's explicit non-goal and the pre-existing `design.md` layout requirement (12-column tiled grid on desktop, single column on mobile). No z-index stacking, no drag behavior, no collision logic to design.

**5. `Hero`'s permanent "booting" feel is presentational, not a new animation system.**
Rather than looping the existing decrypt animation forever (which would fight the requirement that the final headline text must always be present/readable for reduced-motion and accessibility), the boot feel comes from `Hero`'s pane chrome itself — its title bar reads as a boot process (`boot.sh`) and static boot-log-style flavor lines sit above the headline — while the headline's one-time decrypt-in animation behavior is unchanged from the current implementation.

**6. Marquee becomes taskbar-shaped via layout/border changes only.**
Restyle `Marquee` to look like a taskbar strip (segmented items with dividers, sitting at a consistent position in the flow) but add no click handlers, hrefs, or focus targets in this change — it remains exactly as non-interactive as it is today, just shaped for its future job.

**7. Anchor ids match each pane's process identity.**
E.g. `Arsenal`'s pane gets `id="arsenal"` because its process identity is `ls -la ./arsenal/`. This costs nothing now and means a future navigation change doesn't have to invent or bikeshed ids.

## Risks / Trade-offs

- **[Risk]** Wrapping six sections in new shared chrome touches every section file, similar in shape to the previous reskin's diff. → **Mitigation**: the shared `TerminalPane` component means each section only needs to adopt the wrapper and pass its identity props — the chrome itself is built once.
- **[Risk]** A global escalation counter is a new piece of client-side state shared across the whole page; if implemented as prop-drilled state it could get awkward. → **Mitigation**: keep it to one small provider/context at the `App` level — this is a small, contained piece of shared UI state, not a reason to introduce a state management library.
- **[Risk]** Permanent "booting" framing on `Hero` could read as broken/stuck rather than intentional if not paired with a static boot-log detail that visibly finishes. → **Mitigation**: the boot-log flavor lines are static (not looping/animating forever) — only the headline itself animates once, same as today.
- **[Trade-off]** Deferring real navigation means `Marquee`'s taskbar restyle is speculative — if the future navigation change ends up wanting a different shape (e.g. a sidebar dock instead of a horizontal strip), this restyle is wasted. Accepted: the user explicitly wants this treated as decorative-now/functional-later, and a horizontal strip is the natural taskbar shape given `Marquee`'s existing position and full-width layout.

## Migration Plan

1. Build `TerminalPane` (chrome only: title bar, controls, per-pane props) with no close-button behavior yet — verify it renders correctly wrapping one section first (e.g. `Briefing`) before rolling out to all six.
2. Add the global escalation state/provider and wire `[x]` in `TerminalPane` to it; verify the tier table renders correctly and resets are not needed (state persists per page load, no reset button).
3. Roll `TerminalPane` out to the remaining five sections, each with its own identity props and anchor id.
4. Apply `Hero`'s boot-log static flavor lines.
5. Restyle `Marquee` to the taskbar shape.
6. Full visual + click-through pass: confirm `[-]`/`[□]` are inert, `[x]` always refuses and never removes a pane, and escalation is shared across panes.

No data migration or rollback complexity — purely additive UI change, revertible by branch revert.

## Open Questions

- None outstanding — button scope, escalation scope (global vs. per-pane), and per-section flavor were resolved with the user before this design was written. Exact escalation copy (table above) was filled in as a reasonable default; open to revision if it doesn't land right once built.
