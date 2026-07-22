## MODIFIED Requirements

### Requirement: Tiered prize list on homepage teaser
The homepage prizes section SHALL display a small highlighted subset of items derived from the tiered prize catalog (`prizeTiers.js`), rather than a separately maintained fixed list. The full breakdown of all tiers and items SHALL remain available via the `/prizes` dossier page.

#### Scenario: Homepage teaser renders
- **WHEN** the homepage prizes section is displayed
- **THEN** a curated subset of items sourced from the tiered prize catalog is shown, with a link to view the full dossier

#### Scenario: Full dossier renders
- **WHEN** the `/prizes` page is displayed
- **THEN** every tier and every item from the tiered prize catalog is shown

### Requirement: Config-driven prize data
Prize content (name, image, description/label) SHALL be defined in a single data source (`prizeTiers.js`) rather than hardcoded per-item in component markup or duplicated across multiple data files, so items can be edited in one place without modifying component code and without the homepage teaser and full dossier page drifting out of sync.

#### Scenario: Editing a prize
- **WHEN** a developer changes a prize's name, image path, or description in `prizeTiers.js`
- **THEN** both the homepage teaser (if that item is highlighted) and the `/prizes` full dossier reflect the change without any other code modification

#### Scenario: Single source of truth
- **WHEN** a developer searches the codebase for prize content
- **THEN** `prizeTiers.js` is the only data file defining prize items; no separate, independently-edited prize list exists
