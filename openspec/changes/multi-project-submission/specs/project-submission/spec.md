## ADDED Requirements

### Requirement: Multi-select Hackatime project picker
On the "software" category submission flow, the dashboard SHALL allow the user to select any number of Hackatime projects (zero cap on maximum). Clicking a project card SHALL toggle its selection state rather than replacing the current selection.

#### Scenario: Selecting a first project
- **WHEN** no projects are selected and the user clicks a project card
- **THEN** that project becomes selected and is visually marked as selected

#### Scenario: Selecting an additional project
- **WHEN** one or more projects are already selected and the user clicks a different, unselected project card
- **THEN** that project is added to the selection alongside the previously selected ones

#### Scenario: Deselecting a project
- **WHEN** a project is currently selected and the user clicks its card again
- **THEN** that project is removed from the selection while any other selected projects remain selected

#### Scenario: No maximum selection limit
- **WHEN** the user selects more than a small number of projects (e.g. more than 3)
- **THEN** all selected projects remain selected with no limit enforced

### Requirement: Summed tracked hours across selected projects
The dashboard SHALL compute the tracked-hours total used for prize-cart eligibility as the sum of tracked seconds across all currently selected projects, converted to hours.

#### Scenario: Hours summed across multiple selections
- **WHEN** the user has selected two or more projects
- **THEN** the displayed tracked-hours total equals the sum of each selected project's tracked seconds divided by 3600

#### Scenario: Hours update on selection change
- **WHEN** the user adds or removes a project from the selection
- **THEN** the displayed tracked-hours total recalculates to reflect the current set of selected projects

#### Scenario: No projects selected
- **WHEN** no projects are selected
- **THEN** the tracked-hours total is zero and the prize picker step is not shown

### Requirement: Project names shown for selection, not persisted
The dashboard SHALL display the names of all currently selected projects (e.g. comma-separated) alongside the summed hours. The submission process SHALL NOT persist the selected project name(s) to Airtable or any other durable store, individually or combined; only the summed hours value is written.

#### Scenario: Label reflects all selected projects
- **WHEN** the user has selected multiple projects
- **THEN** the on-screen label lists all selected project names alongside the summed tracked hours

#### Scenario: No project name field in the persisted record
- **WHEN** a submission is successfully created
- **THEN** the created record contains the summed hours value but no field containing the selected project name(s)

### Requirement: Server-side re-validation of all selected projects
When a submission is received for the "software" category, the server SHALL independently re-fetch the authoritative list of the user's Hackatime projects for the session and SHALL resolve every project name submitted by the client against that authoritative list. The server SHALL NOT trust client-supplied hours values.

#### Scenario: All submitted project names resolve
- **WHEN** every project name submitted by the client matches a project in the freshly-fetched authoritative Hackatime project list
- **THEN** the server computes tracked hours as the sum of each matched project's tracked seconds divided by 3600, and this server-computed value is what gets written to Airtable

#### Scenario: A submitted project name does not resolve
- **WHEN** one or more project names submitted by the client do not match any project in the freshly-fetched authoritative Hackatime project list
- **THEN** the entire submission is rejected with an error, and no Airtable record is created

### Requirement: Hardware category unaffected
The "hardware" category submission path, which uses self-reported hours and has no Hackatime project selection, SHALL be unaffected by multi-project selection support.

#### Scenario: Hardware submission unchanged
- **WHEN** the user submits a "hardware" category project
- **THEN** the submission flow behaves exactly as before, using the self-reported hours field and no project picker
