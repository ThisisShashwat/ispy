## ADDED Requirements

### Requirement: Hour-tiered prize layout
The `/prizes` page SHALL display prizes grouped into hour tiers, each tier rendered as a distinct column/section labeled with its hour threshold, containing a grid of the prize items available at that tier.

#### Scenario: Prizes page renders tiers
- **WHEN** the `/prizes` page is displayed
- **THEN** each entry in the tiered prize data source renders as its own labeled tier containing its associated prize items

### Requirement: Config-driven tiered prize data
Tiered prize content (hour threshold, tier label, and per-item name/image/description) SHALL be defined in a single data source separate from the homepage teaser's data, so tiers and items can be added, removed, or edited without modifying page component code.

#### Scenario: Editing tier data
- **WHEN** a developer adds, removes, or edits a tier or a prize item in the tiered prize data source
- **THEN** the `/prizes` page reflects the change without any other code modification

### Requirement: Static hour-breakdown explanation
The `/prizes` page SHALL display static, plain-language copy explaining that prizes are earned by logging hours externally and redeeming them at the corresponding tier, without implying live/real-time hour tracking.

#### Scenario: First-time visitor reads the explanation
- **WHEN** a user loads the `/prizes` page
- **THEN** explanatory copy describing how the hour breakdown works is visible before or alongside the tier columns

### Requirement: Placeholder-safe tier content
Tier and item content SHALL use placeholder values (data and, where applicable, images) that render correctly, such that replacing placeholders with real prize data later requires only data-source edits.

#### Scenario: Missing item image handling
- **WHEN** a prize item's referenced image file is missing or fails to load
- **THEN** the item card still renders its name and description without breaking the tier's layout
