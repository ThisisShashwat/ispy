## ADDED Requirements

### Requirement: Editable GitHub username at submission
The project submission form SHALL allow the user to edit the GitHub Username field, pre-filled from the user's OAuth profile value when available.

#### Scenario: GitHub username pre-fills from OAuth profile
- **WHEN** a user opens the submission form and their profile has a `githubUsername` from OAuth
- **THEN** the GitHub Username field is populated with that value and is editable

#### Scenario: OAuth never linked a GitHub account
- **WHEN** a user opens the submission form and their profile has no `githubUsername`
- **THEN** the GitHub Username field starts empty and is editable, allowing the user to enter one

#### Scenario: User corrects a renamed GitHub username
- **WHEN** a user changes the GitHub Username field to a value different from their OAuth-cached profile value
- **THEN** the submission is created using the edited value

### Requirement: GitHub username edits are submission-scoped
Editing the GitHub Username field on the submission form SHALL NOT modify the user's stored profile or OAuth-cached identity data.

#### Scenario: Correction does not persist to profile
- **WHEN** a user edits the GitHub Username field and submits the form
- **THEN** the user's profile `githubUsername` value remains unchanged
- **AND** a subsequent, separate submission by the same user pre-fills the GitHub Username field from the original OAuth-cached profile value, not the prior correction

### Requirement: No format validation on GitHub username
The GitHub Username field SHALL NOT enforce format or non-empty validation, consistent with other free-text fields on the submission form.

#### Scenario: Empty or arbitrary value is accepted
- **WHEN** a user submits the form with the GitHub Username field empty or containing arbitrary text
- **THEN** the form does not block submission on account of the GitHub Username field's content
