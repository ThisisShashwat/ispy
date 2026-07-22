## ADDED Requirements

### Requirement: Dashboard lists the user's Hackatime projects
The `/dashboard` page SHALL display the authenticated user's Hackatime projects (name, tracked hours, languages), fetched via `hackclub-oauth`'s Hackatime integration, and SHALL let the user select exactly one project as the subject of their submission. The full project list SHALL be fetched from Hackatime as before; the requirements below filter that same list client-side without any additional fetch.

#### Scenario: Projects available
- **WHEN** the Hackatime API returns one or more projects for the authenticated user
- **THEN** each project is listed with its name and tracked hours, and the user can select exactly one

#### Scenario: No projects available
- **WHEN** the Hackatime API returns an empty project list for the authenticated user
- **THEN** the dashboard indicates no projects are available and does not allow proceeding to prize selection or the submission form

### Requirement: Project list is capped with client-side search
When the user has more than 10 Hackatime projects, the dashboard SHALL initially display only the top 10 by tracked hours (descending), and SHALL provide a search input that filters the full project list by name (case-insensitive substring match) entirely client-side. This SHALL NOT trigger an additional Hackatime API request.

#### Scenario: More than 10 projects, no search entered
- **WHEN** the authenticated user has more than 10 Hackatime projects and the search field is empty
- **THEN** only the 10 projects with the highest tracked hours are shown

#### Scenario: Searching narrows the list
- **WHEN** the user types text into the project search field
- **THEN** the displayed projects are filtered to those whose name contains the typed text, regardless of the top-10 cap, using the already-fetched project list

#### Scenario: 10 or fewer projects
- **WHEN** the authenticated user has 10 or fewer Hackatime projects
- **THEN** all projects are shown and no search input is displayed

### Requirement: Prize picker is gated by the selected project's tracked hours
After a project is selected, the dashboard SHALL display the prize catalog (`prizeTiers.js`) and SHALL disable any tier whose hour threshold exceeds `selectedProject.total_seconds / 3600`. The user SHALL NOT be able to select a disabled tier's items.

#### Scenario: Selecting an eligible tier
- **WHEN** the selected project's tracked hours meet or exceed a tier's threshold
- **THEN** items in that tier are selectable as the submission's prize

#### Scenario: Attempting to select an ineligible tier
- **WHEN** the selected project's tracked hours are below a tier's threshold
- **THEN** items in that tier are visibly disabled and cannot be selected

#### Scenario: Changing the selected project updates eligibility
- **WHEN** the user changes which project is selected
- **THEN** the prize picker recalculates eligibility using the newly selected project's tracked hours, and any previously chosen prize that is no longer eligible is deselected

### Requirement: Submission form autofills identity data
The submission form SHALL prefill First Name, Last Name, Email, and GitHub Username from the authenticated user's identity and Hackatime data, and SHALL render these as read-only. Birthday and Address are NOT autofilled — the `birthdate` and `address` OAuth scopes are restricted to HQ-Official-tier apps (see `hackclub-oauth`) and are not requested, so these fields are collected manually instead (see "Submission form collects remaining required fields").

#### Scenario: Form opens with identity data available
- **WHEN** the user reaches the submission form after selecting a project and prize
- **THEN** First Name, Last Name, Email, and GitHub Username are prefilled and not editable

### Requirement: Submission form collects remaining required fields
The submission form SHALL provide inputs for Playable URL, Code URL, Screenshot, Description, Birthday, Address Line 1, City, State/Province, Country, and Zip Code (all required), and Address Line 2 and Comments (both optional). Prize is set from the dashboard's prize selection, not typed directly into the form.

#### Scenario: Optional field left blank
- **WHEN** the user submits the form without entering Comments
- **THEN** the submission is not blocked by the missing Comments value

### Requirement: Client-side validation blocks submission on missing required fields
Before sending a submission request, the dashboard SHALL verify that Playable URL, Code URL, Screenshot, Description, Prize, Birthday, Address Line 1, City, State/Province, Country, and Zip Code are all present, and SHALL show an inline, field-specific notification and prevent submission if any are missing.

#### Scenario: Required field missing
- **WHEN** the user attempts to submit with any required field empty
- **THEN** submission is blocked, no request is sent, and the user is shown which field(s) are missing

#### Scenario: All required fields present
- **WHEN** all required fields are filled and a prize is selected
- **THEN** the dashboard sends the submission request to the server

### Requirement: Successful submission navigates to a confirmation page
On a successful response from the submission endpoint, the dashboard SHALL navigate the user to a dedicated confirmation page rather than only showing an inline message, so it is unambiguous that the submission went through.

#### Scenario: Submission succeeds
- **WHEN** the submission endpoint returns success
- **THEN** the user is navigated to `/dashboard/success`, which is gated to authenticated users and confirms the submission was received
