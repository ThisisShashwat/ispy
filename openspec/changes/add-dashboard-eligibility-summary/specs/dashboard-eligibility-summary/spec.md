## ADDED Requirements

### Requirement: Eligibility summary placement
The `/dashboard` page SHALL render a static eligibility-summary section above the existing "CASE FILE — AGENT DASHBOARD" eyebrow and "Submit a project" heading, so it is the first content a user sees on the page.

#### Scenario: Dashboard page renders
- **WHEN** an authenticated user loads `/dashboard`
- **THEN** the eligibility-summary section appears before the "CASE FILE — AGENT DASHBOARD" eyebrow and "Submit a project" heading in document order

### Requirement: Eligibility summary visual identity
The eligibility-summary section SHALL have its own eyebrow label and heading, styled consistently with the homepage's existing `CASE FILE 00X` eyebrow/heading pattern, and SHALL NOT reuse the dashed-border callout box style used on `/prizes`.

#### Scenario: Section styling
- **WHEN** the eligibility-summary section is displayed
- **THEN** it presents a tracked-letter mono eyebrow label and a distinct heading matching the homepage section pattern, and does not use a dashed-border box container

### Requirement: Eligibility summary content
The eligibility-summary section SHALL present exactly three concise, independently-worded bullet points covering: (1) the project must be real and working, not a mockup, (2) the project must be shipped publicly (repo, build, or hardware demo), and (3) hardware projects have some exceptions to the "fully working" bar. The section SHALL NOT mention prizes, prize tiers, or tracked/logged hours.

#### Scenario: Content renders without reward mechanics
- **WHEN** the eligibility-summary section is displayed
- **THEN** it shows three bullet points covering real/working status, public shipping, and the hardware exception, and contains no reference to prizes, tiers, or hours
