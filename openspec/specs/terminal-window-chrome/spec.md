# terminal-window-chrome Specification

## Requirements

### Requirement: Terminal pane chrome per section
Each of the page's sections (Hero, Briefing, Arsenal, Prizes, HowItWorks, CtaFooter) SHALL be rendered inside a terminal-emulator pane with a title bar showing a `user@host:path`-style identity and fake window controls (minimize, maximize, close).

#### Scenario: Section renders as a terminal pane
- **WHEN** any of the six sections is displayed
- **THEN** it is wrapped in a bordered pane with a title bar showing a `user@host:path`-style string and three window-control glyphs

### Requirement: Per-section terminal identity
Each section's pane SHALL display a distinct process/command identity in its title bar reflecting that section's content, rather than identical or generic chrome across all sections.

#### Scenario: Distinct identities across sections
- **WHEN** the page is viewed top to bottom
- **THEN** no two sections' panes display the same title-bar process identity, and each identity is thematically related to that section's content

### Requirement: Persistent boot-sequence framing for Hero
The Hero section's pane SHALL read as a boot sequence in progress at all times, not only during its initial headline animation, and SHALL NOT settle into a generic steady-state prompt after that animation completes.

#### Scenario: Hero viewed after animation completes
- **WHEN** the hero headline's one-time decrypt-in animation has finished
- **THEN** the Hero pane's chrome and surrounding flavor text still read as a boot sequence (e.g. a boot-process title and static boot-log-style lines), not a plain idle terminal

### Requirement: Tiled pane layout
Terminal panes SHALL be laid out in normal tiled/stacked document flow (single column on mobile, tiled grid on desktop) and SHALL NOT be absolutely positioned, draggable, or overlapping.

#### Scenario: Panes do not overlap
- **WHEN** the page is viewed at any supported viewport width
- **THEN** no terminal pane overlaps another, and panes stack or tile in the section order defined by the page layout

### Requirement: Non-functional close control with escalating refusal
Each pane's close control (`[x]`) SHALL NOT remove, hide, or close its pane when clicked. Instead it SHALL trigger a visible refusal response, and repeated close-attempts across the whole page SHALL escalate through a shared sequence of increasingly emphatic refusal messages, using one shared attempt count across all panes rather than a per-pane count.

#### Scenario: First close attempt
- **WHEN** a user clicks a pane's close control for the first time on the page
- **THEN** the pane is not removed, and a first-tier refusal message is shown

#### Scenario: Escalation is shared across panes
- **WHEN** a user clicks the close control on one pane, then clicks the close control on a different pane
- **THEN** the second click's refusal message reflects the second attempt in the shared, page-wide sequence, not a first attempt local to that pane

#### Scenario: Escalation caps out
- **WHEN** a user clicks close controls more times than the highest defined escalation tier
- **THEN** the highest-tier refusal message continues to display rather than erroring or cycling back to the first tier

### Requirement: Inert minimize and maximize controls
Each pane's minimize (`[-]`) and maximize (`[□]`) controls SHALL be visually present but SHALL NOT trigger any visible reaction, animation, or state change when clicked.

#### Scenario: Minimize or maximize clicked
- **WHEN** a user clicks a pane's minimize or maximize control
- **THEN** no visible change occurs anywhere on the page

### Requirement: Taskbar-shaped, non-interactive Marquee
The Marquee component SHALL be visually restyled as a taskbar-like strip while remaining non-interactive (no links, click handlers, or focus targets) in this change.

#### Scenario: Marquee viewed
- **WHEN** the Marquee strip is displayed
- **THEN** it is visually shaped like a taskbar (segmented, consistent strip position) but contains no clickable elements

### Requirement: Stable per-pane anchor identifiers
Each terminal pane SHALL expose a stable HTML anchor id matching its process identity, even though no navigation UI links to it in this change.

#### Scenario: Pane anchor exists
- **WHEN** the rendered page markup is inspected
- **THEN** each of the six section panes has a unique, stable id attribute suitable for future anchor-linking
