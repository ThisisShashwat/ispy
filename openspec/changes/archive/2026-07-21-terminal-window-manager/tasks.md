## 1. Global escalation state

- [x] 1.1 Add a small page-level provider/state (e.g. context at `App` level) tracking a single shared close-attempt counter
- [x] 1.2 Define the escalation tier table (1 / 2–3 / 4–6 / 7+) and a lookup function mapping attempt count to a message, capping at the highest tier
- [x] 1.3 Expose an `onCloseAttempt()` handler that increments the counter and returns the current tier's message

## 2. TerminalPane shared component

- [x] 2.1 Build `TerminalPane` (or similar) accepting `host`, `path`/command string, `id` (anchor), and children — renders a title bar (`user@host:path$`) and `[-][□][x]` controls around its content
- [x] 2.2 Wire `[x]` to call the shared `onCloseAttempt()` handler and render the returned refusal message as a line of terminal output under the title bar, auto-clearing after a few seconds
- [x] 2.3 Add a brief shake animation on refusal, reusing the existing `glitchShift` keyframe from the Cathode Protocol theme — added a finite `shake-once` animation variant (2 iterations) rather than the infinite `glitch` variant
- [x] 2.4 Style the refusal message using the amber/secondary token (consistent with the palette's existing warning convention)
- [x] 2.5 Confirm `[-]` and `[□]` render but have no click handler, animation, or visible reaction
- [x] 2.6 Verify with one section first (e.g. `Briefing`) before rolling out to the rest — verified via Playwright screenshots: chrome renders correctly, close-button escalation works (tier 1 → tier 2 confirmed across two clicks)

## 3. Roll out to all sections

- [x] 3.1 Wrap `Hero` in `TerminalPane` with identity `boot.sh`, id `hero`
- [x] 3.2 Wrap `Briefing` in `TerminalPane` with identity `cat case_file_001.md`, id `briefing`
- [x] 3.3 Wrap `Arsenal` in `TerminalPane` with identity `ls -la ./arsenal/`, id `arsenal`
- [x] 3.4 Wrap `Prizes` in `TerminalPane` with identity `./reward_shop.py --tier`, id `prizes`
- [x] 3.5 Wrap `HowItWorks` in `TerminalPane` with identity `man protocol`, id `how-it-works`
- [x] 3.6 Wrap `CtaFooter` in `TerminalPane` with identity an idle `awaiting command...` prompt, id `cta`
- [x] 3.7 Confirm no two panes share a title-bar identity and each pane has a unique anchor id

## 4. Hero boot-sequence framing

- [x] 4.1 Add static boot-log-style flavor lines to `Hero`'s pane (visible before/around the existing one-time decrypt-in headline animation)
- [x] 4.2 Confirm the existing decrypt-in headline animation behavior (including reduced-motion fallback) is unchanged — `useDecryptText` hook itself untouched
- [x] 4.3 Confirm the pane still reads as "mid-boot" after the headline animation finishes (no steady-state prompt look) — title bar (`./boot.sh`) and static boot log lines don't change after the animation finishes

## 5. Marquee taskbar restyle

- [x] 5.1 Restyle `Marquee` to a segmented, taskbar-shaped strip (visual only) — replaced the infinite scrolling ticker with a static, bordered-segment flex row (real taskbars/status bars don't marquee-scroll)
- [x] 5.2 Confirm no click handlers, hrefs, or focus targets were added — still fully non-interactive

## 6. Layout verification

- [x] 6.1 Confirm panes tile/stack in normal document flow at desktop width, with no overlap — verified via Playwright screenshot at 1440px, no horizontal overflow, panes stacked flush with visible seams
- [x] 6.2 Confirm panes stack single-column at mobile width (375px), with no horizontal overflow — verified via Playwright screenshot at 375px
- [x] 6.3 Confirm section order is unchanged from before this change — Hero, Marquee, Briefing, Arsenal, Prizes, HowItWorks, CtaFooter, same as `App.jsx` before this change

## 7. Interaction verification

- [x] 7.1 Click `[x]` on one pane multiple times — confirm the pane never closes and the message escalates through the tier table — verified via Playwright: tier 1 → tier 2 → tier 3 → tier 4 (cap) all confirmed
- [x] 7.2 Click `[x]` across two different panes — confirm the escalation counter is shared (second click anywhere shows the second-tier message, not a fresh first-tier message) — verified: click on `#hero` gave tier 1, next click on `#arsenal` gave tier 2
- [x] 7.3 Click past the highest tier — confirm the message stays on the final tier rather than erroring or resetting — verified: 10 total clicks stayed on the tier-4 message, no error, no reset
- [x] 7.4 Click `[-]` and `[□]` on multiple panes — confirm no visible reaction anywhere — verified via DOM-state comparison (controlling for the pre-existing scroll-reveal animation): pane markup identical before/after, no refusal message triggered
