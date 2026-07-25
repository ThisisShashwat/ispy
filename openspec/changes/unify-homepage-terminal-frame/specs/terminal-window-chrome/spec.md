## MODIFIED Requirements

### Requirement: Single page-wide terminal frame
The homepage SHALL be rendered inside a single terminal-emulator frame with one title bar showing a `user@host:path`-style identity and one set of window controls (minimize, maximize, close), rather than a separate pane per section.

#### Scenario: Page renders inside one frame
- **WHEN** the homepage is displayed
- **THEN** exactly one title bar with a `user@host:path`-style string and one set of three window-control glyphs is present on the page, and all six sections (Hero, Briefing, Arsenal, Prizes, HowItWorks, CtaFooter) render as content inside that single frame

#### Scenario: Frame scrolls with the page
- **WHEN** a user scrolls down the homepage
- **THEN** the frame's title bar scrolls out of view with the rest of the content (it is not fixed, sticky, or pinned), and there is no internal fixed-height scroll region separate from the page's own scroll

### Requirement: Sections remain visually distinct chunks within the frame
Sections SHALL remain visually distinguishable from one another inside the shared frame via dividers between them, and SHALL NOT be merged into an undifferentiated scroll or rewritten as a literal sequential command-transcript (e.g. repeated `$ command` prompts per section).

#### Scenario: Section boundaries are visible
- **WHEN** the page is viewed top to bottom
- **THEN** a visible divider separates each section from the next, and each section's existing content/layout (e.g. Arsenal's card grid, Prizes' dossier photos) is preserved as-is

### Requirement: Persistent boot-sequence framing for Hero content
The Hero section's content SHALL continue to read as a boot sequence in progress (via its boot-log lines and decrypt-in headline animation) at all times after the animation completes, independent of any pane-level chrome, since Hero no longer has its own title bar.

#### Scenario: Hero viewed after animation completes
- **WHEN** the hero headline's one-time decrypt-in animation has finished
- **THEN** the Hero section's boot-log lines and surrounding flavor text still read as a boot sequence, not a plain idle state

### Requirement: Inert window controls
The single frame's minimize (`[-]`), maximize (`[□]`), and close (`[x]`) controls SHALL be visually present but SHALL NOT trigger any visible reaction, animation, escalating message, or state change when clicked.

#### Scenario: Any control clicked
- **WHEN** a user clicks the frame's minimize, maximize, or close control
- **THEN** no visible change occurs anywhere on the page

### Requirement: Stable per-section anchor identifiers
Each of the six content sections SHALL expose a stable HTML anchor id matching its section identity, even though no navigation UI links to it in this change.

#### Scenario: Section anchor exists
- **WHEN** the rendered page markup is inspected
- **THEN** each of the six sections has a unique, stable id attribute suitable for future anchor-linking

## REMOVED Requirements

### Requirement: Terminal pane chrome per section
**Reason**: Replaced by a single page-wide frame; individual sections no longer render their own pane chrome.
**Migration**: See "Single page-wide terminal frame" above.

### Requirement: Per-section terminal identity
**Reason**: There is only one title bar for the whole page now, so distinct per-section process identities no longer apply.
**Migration**: Section flavor (case-file labels like `CASE FILE 001 — BRIEFING`) is preserved as in-content text rather than title-bar text.

### Requirement: Tiled pane layout
**Reason**: With one frame instead of multiple panes, there is nothing to tile; the single frame is normal document flow by definition of "Single page-wide terminal frame" above.
**Migration**: None needed.

### Requirement: Non-functional close control with escalating refusal
**Reason**: The escalation gag (shared attempt counter, tiered refusal messages) is out of scope for this change per explicit product decision.
**Migration**: Close becomes a simple inert control, covered by "Inert window controls" above. `CloseAttemptContext` is left in the codebase unused; removing it is out of scope for this change.
