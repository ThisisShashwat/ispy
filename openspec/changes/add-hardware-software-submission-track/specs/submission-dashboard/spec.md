## MODIFIED Requirements

### Requirement: Entering the submission flow
- **WHEN** the user clicks "Submit a project"
- **THEN** the dashboard reveals a category choice ("Hardware" or "Software") before showing any project- or hours-entry step

#### Scenario: Entering the submission flow
- **WHEN** the user clicks "Submit a project"
- **THEN** the dashboard displays the category choice, and neither the Hackatime project picker nor the hardware hours-entry step is shown yet

### Requirement: Dashboard lists the user's Hackatime projects
On the software track, the `/dashboard` page SHALL display the authenticated user's Hackatime projects (name, tracked hours, languages), fetched via `hackclub-oauth`'s Hackatime integration, and SHALL let the user select exactly one project as the subject of their submission. The full project list SHALL be fetched from Hackatime as before; the requirements below filter that same list client-side without any additional fetch. This step is not shown on the hardware track.

#### Scenario: Projects available
- **WHEN** the user has chosen the Software category and the Hackatime API returns one or more projects for the authenticated user
- **THEN** each project is listed with its name and tracked hours, and the user can select exactly one

#### Scenario: No projects available
- **WHEN** the user has chosen the Software category and the Hackatime API returns an empty project list for the authenticated user
- **THEN** the dashboard indicates no projects are available and does not allow proceeding to prize selection or the submission form

### Requirement: Prize picker is gated by tracked hours
After the project-or-hours step is completed, the dashboard SHALL display the prize catalog (`prizeTiers.js`) and SHALL disable any tier whose hour threshold exceeds the current track's tracked-hours value — on the software track, `selectedProject.total_seconds / 3600`; on the hardware track, the user-entered self-reported hours. The user SHALL NOT be able to select a disabled tier's items.

#### Scenario: Selecting an eligible tier (software)
- **WHEN** the selected project's tracked hours meet or exceed a tier's threshold
- **THEN** items in that tier are selectable as the submission's prize

#### Scenario: Selecting an eligible tier (hardware)
- **WHEN** the user-entered self-reported hours meet or exceed a tier's threshold
- **THEN** items in that tier are selectable as the submission's prize

#### Scenario: Attempting to select an ineligible tier
- **WHEN** the current track's tracked-hours value is below a tier's threshold
- **THEN** items in that tier are visibly disabled and cannot be selected

#### Scenario: Changing the selected project updates eligibility
- **WHEN** the user is on the software track and changes which project is selected
- **THEN** the prize picker recalculates eligibility using the newly selected project's tracked hours, and any previously chosen prize that is no longer eligible is deselected

#### Scenario: Changing the self-reported hours updates eligibility
- **WHEN** the user is on the hardware track and changes the self-reported hours value
- **THEN** the prize picker recalculates eligibility using the new value, and any previously chosen prize that is no longer eligible is deselected

### Requirement: Submission form collects remaining required fields
The submission form SHALL provide inputs for Playable URL, Code URL, Screenshot, Description, Birthday, Address Line 1, City, State/Province, Country, and Zip Code (all required, both tracks), and Address Line 2 and Comments (both optional). On the hardware track, the form SHALL also require a Journal Link. Prize is set from the dashboard's prize selection, not typed directly into the form.

#### Scenario: Optional field left blank
- **WHEN** the user submits the form without entering Comments
- **THEN** the submission is not blocked by the missing Comments value

#### Scenario: Hardware track requires a journal link
- **WHEN** the user is on the hardware track and attempts to submit without a Journal Link
- **THEN** submission is blocked and the user is shown that Journal Link is required

#### Scenario: Software track does not show a journal link field
- **WHEN** the user is on the software track
- **THEN** no Journal Link field is shown, and it is not required for submission

## ADDED Requirements

### Requirement: Category choice determines submission track
Immediately after clicking "Submit a project," the user SHALL be asked to choose a category: Hardware or Software. This choice determines which project-identification step and which submission-form fields are shown, and is included in the submitted record's `Category` field.

#### Scenario: Choosing Software
- **WHEN** the user selects "Software"
- **THEN** the dashboard proceeds to the Hackatime project picker, and the submission is recorded with Category = "Software"

#### Scenario: Choosing Hardware
- **WHEN** the user selects "Hardware"
- **THEN** the dashboard proceeds to the self-reported hours step, and the submission is recorded with Category = "Hardware"

### Requirement: Hardware track collects self-reported hours instead of a Hackatime project
On the hardware track, in place of the Hackatime project picker, the dashboard SHALL provide a numeric input for the user to self-report hours spent. This value SHALL be used as the tracked-hours figure for prize eligibility and SHALL be sent to the server as the submission's hours value; the server SHALL NOT attempt to verify it against Hackatime (there is no Hackatime project associated with a hardware submission).

#### Scenario: Entering self-reported hours
- **WHEN** the user is on the hardware track and types a number into the hours field
- **THEN** that number becomes the tracked-hours value used to gate the prize picker

#### Scenario: Self-reported hours missing
- **WHEN** the user is on the hardware track and attempts to proceed to the prize picker without entering an hours value
- **THEN** the dashboard blocks progression and indicates the hours field is required

### Requirement: Server validates and records submissions by category
The `/api/submit` endpoint SHALL branch its validation and Airtable payload construction based on the submitted category. For Software, it SHALL re-fetch the user's Hackatime projects and tracked hours from the authenticated session and re-verify prize eligibility against that server-fetched value, exactly as before this change. For Hardware, it SHALL require a non-empty Journal Link, SHALL use the client-submitted self-reported hours value directly (with no independent re-verification source available) to check prize eligibility, and SHALL NOT require or look up a Hackatime project. In both cases the record SHALL include `Category` ("Hardware" or "Software") and, for Hardware, `Journal Link`; the hours value (Hackatime-derived or self-reported) SHALL be written to the existing `Optional - Override Hours Spent` field.

#### Scenario: Software submission re-verified server-side
- **WHEN** a Software-category submission is received
- **THEN** the server re-fetches the user's Hackatime data, re-derives tracked hours for the named project, and rejects the submission if the re-derived hours are below the selected prize's tier threshold

#### Scenario: Hardware submission trusts client-submitted hours
- **WHEN** a Hardware-category submission is received
- **THEN** the server checks the submitted self-reported hours against the selected prize's tier threshold and rejects the submission if insufficient, without attempting to verify the hours value against any external source

#### Scenario: Hardware submission missing journal link
- **WHEN** a Hardware-category submission is received without a Journal Link value
- **THEN** the server rejects the submission and reports Journal Link as a missing required field

#### Scenario: Hardware submission missing Hackatime project
- **WHEN** a Hardware-category submission is received
- **THEN** the server does not require or look up a matching Hackatime project, unlike the Software path
