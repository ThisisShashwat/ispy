## ADDED Requirements

### Requirement: Client-side route table
The application SHALL define client-side routes for at least the homepage (`/`) and the prizes page (`/prizes`), rendered via a client-side router rather than in-page anchor scrolling alone.

#### Scenario: Navigating to the homepage
- **WHEN** a user loads the root URL (`/`)
- **THEN** the existing homepage section stack renders unchanged

#### Scenario: Navigating to the prizes page
- **WHEN** a user loads `/prizes` (via in-app navigation or a direct URL/refresh)
- **THEN** the prizes page renders without a full page error or 404

### Requirement: In-app navigation without full page reload
Navigating between defined routes from within the app SHALL use client-side transitions (no full browser page reload) where triggered via an in-app link.

#### Scenario: Following the homepage-to-prizes link
- **WHEN** a user clicks the link from the homepage prizes teaser to `/prizes`
- **THEN** the URL updates to `/prizes` and the prizes page renders without a full browser reload
