## 1. Frame component

- [ ] 1.1 Rework `TerminalPane.jsx` into a single page-level frame: one title bar (`user@host:path`-style identity), one set of minimize/maximize/close controls, all inert (no click handlers wired to `CloseAttemptContext`)
- [ ] 1.2 Remove the per-section props the old `TerminalPane` needed (`id`, `host`, `path`, `idle`) that no longer apply at the frame level
- [ ] 1.3 Add divider styling (e.g. `border-t` using existing `border-outline`/`border-dashed` tokens) for use between sections inside the frame

## 2. Page composition

- [ ] 2.1 Update `src/app/page.jsx` to wrap `Hero`, `Marquee`, `Briefing`, `Arsenal`, `Prizes`, `HowItWorks`, `CtaFooter` inside the single frame component
- [ ] 2.2 Confirm frame renders in normal document flow (no fixed/sticky positioning, no internal scroll container)

## 3. Section updates

- [ ] 3.1 `Hero.jsx`: drop its `<TerminalPane>` wrapper, keep `id="hero"` on a plain element, keep boot-log lines and decrypt animation as in-content
- [ ] 3.2 `Briefing.jsx`: drop its `<TerminalPane>` wrapper, keep `id="briefing"` on a plain element
- [ ] 3.3 `Arsenal.jsx`: drop its `<TerminalPane>` wrapper, keep `id="arsenal"` on a plain element, keep card grid unchanged
- [ ] 3.4 `Prizes.jsx`: drop its `<TerminalPane>` wrapper, keep `id="prizes"` on a plain element, keep dossier photo layout unchanged
- [ ] 3.5 `HowItWorks.jsx`: drop its `<TerminalPane>` wrapper, keep `id="how-it-works"` on a plain element
- [ ] 3.6 `CtaFooter.jsx`: drop its `<TerminalPane>` wrapper, keep `id="cta"` on a plain element
- [ ] 3.7 Add a divider between each section using the styling from 1.3

## 4. Verification

- [ ] 4.1 Verify exactly one title bar and one set of window controls render on the homepage
- [ ] 4.2 Verify minimize/maximize/close all remain visually present but no-op (no shake, no refusal message, no state change)
- [ ] 4.3 Verify in-page anchors (`#hero`, `#briefing`, `#arsenal`, `#prizes`, `#how-it-works`, `#cta`) still resolve to the right section
- [ ] 4.4 Verify `useRevealOnScroll` scroll-in animations (Arsenal, HowItWorks, Prizes) still trigger correctly
- [ ] 4.5 Check responsive layout at mobile (375px) and desktop (1440px) widths — no overlap, no horizontal scroll
- [ ] 4.6 Confirm `CloseAttemptContext` provider still mounts without errors even though nothing consumes it from the new frame
