## MODIFIED Requirements

### Requirement: Fixed prize list
The prizes section SHALL display exactly three items: a Flipper Zero, a monitor, and a GoPro. No additional or fewer items SHALL be shown. The section SHALL also include a link to the full `/prizes` page in place of any plain "and more..." text.

#### Scenario: Prizes section renders
- **WHEN** the prizes section is displayed
- **THEN** exactly three prize cards are shown, one each for Flipper Zero, monitor, and GoPro

#### Scenario: Teaser links to the full prizes page
- **WHEN** the prizes section is displayed
- **THEN** a link to the `/prizes` route is shown in place of the previous "and more..." text
