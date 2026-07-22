## ADDED Requirements

### Requirement: Fixed prize list
The prizes section SHALL display exactly three items: a Flipper Zero, a monitor, and a GoPro. No additional or fewer items SHALL be shown.

#### Scenario: Prizes section renders
- **WHEN** the prizes section is displayed
- **THEN** exactly three prize cards are shown, one each for Flipper Zero, monitor, and GoPro

### Requirement: Config-driven prize data
Prize content (name, image, and clearance-level label) SHALL be defined in a single data source rather than hardcoded per-item in component markup, so items can be edited without modifying component code.

#### Scenario: Editing a prize
- **WHEN** a developer changes a prize's name, image path, or clearance-level label in the data source
- **THEN** the rendered prize card reflects the change without any other code modification

### Requirement: Swappable placeholder images
Prize images SHALL be placeholder images stored in one consistent asset folder with clearly identifiable filenames, such that replacing a placeholder with a final image requires only replacing the file (or updating one data field) at a known, documented location.

#### Scenario: Replacing a placeholder image
- **WHEN** a program owner replaces the placeholder image file for a prize with a real photo using the same filename and location
- **THEN** the prize card displays the new image with no code changes required

#### Scenario: Missing image handling
- **WHEN** a prize's referenced image file is missing or fails to load
- **THEN** the prize card still renders its name and clearance-level label without breaking the layout
