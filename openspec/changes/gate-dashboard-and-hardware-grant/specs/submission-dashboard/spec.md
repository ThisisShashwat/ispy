## ADDED Requirements

### Requirement: Dashboard opens with a greeting and an explicit entry point
On loading `/dashboard`, the dashboard SHALL first display a greeting using the authenticated user's OAuth first name and a single "Submit a project" button, rather than immediately showing the Hackatime project picker. The Hackatime project picker and the remainder of the submission flow (prize picker, submission form) SHALL only be shown after the user clicks "Submit a project".

#### Scenario: First name available
- **WHEN** the authenticated user's identity includes a first name
- **THEN** the dashboard displays "Welcome, {firstName}" and a "Submit a project" button, with the Hackatime project picker not yet shown

#### Scenario: First name unavailable
- **WHEN** the authenticated user's identity does not include a first name
- **THEN** the dashboard displays a name-less "Welcome" greeting and a "Submit a project" button, with the Hackatime project picker not yet shown

#### Scenario: Entering the submission flow
- **WHEN** the user clicks "Submit a project"
- **THEN** the dashboard reveals the Hackatime project picker (step 1 of the existing submission flow), unchanged from its current behavior
