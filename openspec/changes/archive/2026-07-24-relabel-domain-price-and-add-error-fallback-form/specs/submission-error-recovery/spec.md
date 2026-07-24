## ADDED Requirements

### Requirement: Backup form link on non-validation submission failure
When a project submission on the dashboard fails for a reason other than client-side field validation (i.e. the `/api/submit` request returns a non-ok response, or the request fails outright due to a network error), the dashboard SHALL display a link/button to a backup Fillout submission form, in addition to the existing error message.

#### Scenario: API returns an error response
- **WHEN** the user submits the dashboard form and `/api/submit` responds with a non-ok status
- **THEN** the existing error message is shown
- **AND** a link/button to the backup Fillout form is shown alongside it

#### Scenario: Network error during submission
- **WHEN** the user submits the dashboard form and the request to `/api/submit` fails (e.g. thrown/network error)
- **THEN** the existing "Network error" message is shown
- **AND** a link/button to the backup Fillout form is shown alongside it

### Requirement: No backup form link on validation failure
The backup form link SHALL NOT be shown when the submission was blocked by client-side validation (missing required fields, no project/hours selected, empty cart, or cart total exceeding tracked hours), since these are user-correctable without a second form.

#### Scenario: Required field missing
- **WHEN** the user submits the dashboard form with one or more required fields empty
- **THEN** field-level validation errors are shown
- **AND** no backup form link is shown

#### Scenario: Cart exceeds available hours
- **WHEN** the user submits the dashboard form with a cart total greater than their tracked/self-reported hours
- **THEN** the "Cart total exceeds your available hours" error is shown
- **AND** no backup form link is shown

### Requirement: Backup form is secondary, not primary
The backup form link SHALL be presented as a plain link or button (not an embedded form) pointing to the external Fillout form, and SHALL be visually subordinate to the primary submission form and its retry path — it is an escape hatch, not a replacement submission flow.

#### Scenario: Backup link rendering
- **WHEN** the backup form link is shown
- **THEN** it renders as a plain link/button to `https://forms.hackclub.com/t/eRmxM63EgHus`
- **AND** the primary dashboard form remains visible and usable so the user can still retry the primary path
