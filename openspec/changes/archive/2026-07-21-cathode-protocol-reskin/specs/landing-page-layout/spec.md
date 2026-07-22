## MODIFIED Requirements

### Requirement: Dossier visual theme
The page SHALL use a consistent Cathode Protocol color palette (obsidian/near-black surfaces, matrix-green primary, amber secondary, bright-white tertiary) and JetBrains Mono typography across all sections, and SHALL NOT use the prior tan-manila/black/red-stamp dossier palette.

#### Scenario: Palette consistency
- **WHEN** any section of the page is viewed
- **THEN** its background, text, and accent colors are drawn from the Cathode Protocol palette (obsidian surfaces, matrix-green primary, amber secondary, bright-white tertiary) and no section uses the tan-manila/black/red-stamp palette

#### Scenario: Typography consistency
- **WHEN** any section of the page is viewed
- **THEN** text is rendered in JetBrains Mono, with primary navigation and high-level headers in all-caps

#### Scenario: Sharp-edged geometry
- **WHEN** any container, button, input, or other UI element is rendered
- **THEN** it has 0px corner radius and no rotation/skew transform, with visual interest expressed only through borders and glow rather than shape or tilt
