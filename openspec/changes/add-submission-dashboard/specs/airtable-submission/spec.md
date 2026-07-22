## ADDED Requirements

### Requirement: Server re-validates all required fields
The submission endpoint SHALL independently verify that Playable URL, Code URL, First Name, Last Name, Email, Screenshot, Description, GitHub Username, Address Line 1, City, State/Province, Country, Zip Code, Birthday, and Prize are all present and non-empty, regardless of what client-side validation already checked. If any required field is missing, the endpoint SHALL reject the request and return an error identifying the missing field(s), and SHALL NOT create or partially create an Airtable record.

#### Scenario: Missing required field reaches the server
- **WHEN** a submission request arrives with any required field missing or empty
- **THEN** the server rejects the request, returns which field(s) are missing, and no Airtable record is created

#### Scenario: All required fields present
- **WHEN** a submission request has every required field populated
- **THEN** the server proceeds to create the Airtable record

### Requirement: Server re-derives and enforces hours-based prize eligibility
The endpoint SHALL independently fetch the selected project's current tracked hours from the Hackatime API and SHALL reject the submission if the requested prize's tier threshold exceeds those hours, even if the client-side picker had allowed the selection.

#### Scenario: Client and server agree on eligibility
- **WHEN** the requested prize's tier threshold is at or below the freshly-fetched tracked hours
- **THEN** the submission proceeds

#### Scenario: Server finds the request ineligible
- **WHEN** the requested prize's tier threshold exceeds the freshly-fetched tracked hours (e.g. hours changed or the client check was bypassed)
- **THEN** the server rejects the submission and returns an eligibility error without creating a record

### Requirement: Screenshot is uploaded to Airtable as an attachment
The endpoint SHALL upload the submitted screenshot file to Airtable's attachment upload API as part of creating the record, without relying on any third-party file host or requiring the user to supply a public URL.

#### Scenario: Valid screenshot provided
- **WHEN** the submission includes a screenshot file
- **THEN** the file is uploaded to Airtable and attached to the record's Screenshot field

#### Scenario: Screenshot rejected by Airtable
- **WHEN** Airtable's attachment upload rejects the file (e.g. unsupported format or size)
- **THEN** the endpoint returns a submission error to the user and does not create a partial record

### Requirement: Override Hours Spent is system-computed, not user-supplied
The endpoint SHALL set the Airtable record's `Optional - Override Hours Spent` field to the same tracked-hours value used for eligibility enforcement, computed server-side from the Hackatime API. This field SHALL NOT be accepted as part of the client-submitted payload.

#### Scenario: Record created
- **WHEN** a submission passes validation and eligibility checks
- **THEN** the created Airtable record's `Optional - Override Hours Spent` equals the server-computed tracked hours for the selected project

#### Scenario: Client attempts to supply an hours value
- **WHEN** a submission request payload includes a value intended for the hours field
- **THEN** the server ignores it and uses only its own computed value

### Requirement: Successful submission creates exactly one complete Airtable record
On success, the endpoint SHALL create exactly one Airtable record containing all required fields, the Prize, the computed Override Hours Spent, and Comments if provided, and SHALL confirm success to the client only after the record is fully created.

#### Scenario: Full successful submission
- **WHEN** all validation and eligibility checks pass and the screenshot uploads successfully
- **THEN** one Airtable record is created with every required field, Prize, computed hours, and any provided Comments, and the client receives a success response
