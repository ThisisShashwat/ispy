## ADDED Requirements

### Requirement: Single-page structure
The site SHALL be a single scrolling page with no client-side or server-side routing. All content SHALL be reachable via in-page anchor scrolling.

#### Scenario: User navigates the site
- **WHEN** a user visits the site root URL
- **THEN** all sections (hero, briefing, arsenal, prizes, how it works, CTA/footer) are present on the same page and reachable by scrolling

### Requirement: Section order
The page SHALL render sections in this order: hero, briefing, arsenal, prizes, how it works, CTA/footer.

#### Scenario: Page renders top to bottom
- **WHEN** the page loads
- **THEN** the hero section appears first, followed by briefing, arsenal, prizes, how it works, and the CTA/footer, in that order

### Requirement: Dossier visual theme
The page SHALL use a consistent tan-manila, black, and red-stamp accent color palette across all sections, and SHALL NOT use a green-on-black terminal color scheme.

#### Scenario: Palette consistency
- **WHEN** any section of the page is viewed
- **THEN** its background, text, and accent colors are drawn from the tan/black/red palette and no section uses green-on-black terminal styling

### Requirement: Responsive layout
The page SHALL render correctly and remain usable across mobile, tablet, and desktop viewport widths without horizontal scrolling or overlapping content.

#### Scenario: Mobile viewport
- **WHEN** the page is viewed at a mobile viewport width (e.g. 375px)
- **THEN** all sections stack vertically, text remains readable, and no content is clipped or requires horizontal scrolling

#### Scenario: Desktop viewport
- **WHEN** the page is viewed at a desktop viewport width (e.g. 1440px)
- **THEN** section content uses the available width appropriately (e.g. multi-column prize grid) without excessive whitespace or overflow
