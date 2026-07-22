# spy-gimmick-effects Specification

## Requirements

### Requirement: Decrypt-in hero headline
The hero headline SHALL animate in with a decrypt/typewriter effect on initial page load, cycling through random glyphs before settling on each final character, and SHALL complete within a bounded duration so it does not block perceived load.

#### Scenario: Hero loads
- **WHEN** the page finishes loading and the hero section mounts
- **THEN** the headline text animates from scrambled glyphs to its final readable text, completing within roughly one second

#### Scenario: Final text always present
- **WHEN** the decrypt animation is disabled, interrupted, or fails to run (e.g. reduced-motion preference, slow device)
- **THEN** the final headline text is still present and readable in the DOM

### Requirement: Redacted censor-bar reveal
Designated text elements SHALL be covered by a black censor bar by default, and SHALL reveal the underlying text when hovered (desktop/pointer input) or when scrolled into view (touch/mobile input).

#### Scenario: Hover reveal on desktop
- **WHEN** a pointer hovers over a redacted text element
- **THEN** the censor bar fades or slides away, revealing the underlying text, and re-covers it when the pointer leaves

#### Scenario: Scroll-into-view reveal on mobile
- **WHEN** a redacted text element scrolls into the viewport on a touch device without hover support
- **THEN** the censor bar reveals the underlying text without requiring a hover interaction

### Requirement: CRT scanline overlay
The page SHALL apply a subtle, page-wide scanline/CRT-style visual overlay tinted to the Cathode Protocol palette (green-tinted lines against the obsidian background) that does not interfere with reading text or interacting with controls.

#### Scenario: Overlay does not block interaction
- **WHEN** a user attempts to click a button, link, or form control anywhere on the page
- **THEN** the scanline overlay does not intercept the click and the underlying control receives the interaction

#### Scenario: Overlay visible but subtle
- **WHEN** any section of the page is viewed
- **THEN** the green-tinted scanline texture is visible but text remains clearly readable against it

### Requirement: Bracketed secured-file prize styling
Prize images SHALL be styled as bracketed, sharp-cornered file-preview modules (e.g. `[ FILENAME.EXT ]` framing) with a `[SECURED]`-style tag and a label-caps caption, consistent with the Cathode Protocol terminal theme, replacing the prior stamped-corner/clip evidence-photo treatment.

#### Scenario: Prize card rendered
- **WHEN** a prize card is displayed
- **THEN** its image is framed in a bracketed, 0px-radius file-preview module with a `[SECURED]`-style tag and no rotation, tape, or stamped-corner treatment
