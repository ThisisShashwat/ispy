## MODIFIED Requirements

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

## RENAMED Requirements
- FROM: `### Requirement: Dossier-photo prize styling`
- TO: `### Requirement: Bracketed secured-file prize styling`
