## ADDED Requirements

### Requirement: Per-item hour cost
Each prize item's hour cost SHALL equal its tier's `hours` value from `prizeTiers.js`. Every item within the same tier SHALL share that tier's cost.

#### Scenario: Cost lookup
- **WHEN** the cost of a prize item is looked up
- **THEN** the returned cost equals the `hours` value of the tier that item belongs to

### Requirement: Multi-item, multi-quantity selection
The prize picker SHALL allow a user to select any combination of prize items and quantities, including multiple units of the same item, rather than a single item selection.

#### Scenario: Selecting multiple distinct items
- **WHEN** a user sets a quantity of 1 or more on two or more different prize items
- **THEN** all of those items are included in the submission's cart

#### Scenario: Selecting multiple units of the same item
- **WHEN** a user sets a quantity of 2 or more on a single prize item
- **THEN** that item is included in the cart with the specified quantity

### Requirement: Cart budget validation
The total cost of a cart, computed as the sum of each selected item's cost multiplied by its quantity, SHALL NOT exceed the submission's tracked hours (Hackatime-derived for software submissions, self-reported for hardware submissions). This validation SHALL be enforced both client-side and server-side, with the server-side check as the authoritative one against a server-derived hours value.

#### Scenario: Cart within budget
- **WHEN** a user's cart total cost is less than or equal to their tracked hours
- **THEN** the submission is allowed to proceed

#### Scenario: Cart over budget
- **WHEN** a user's cart total cost exceeds their tracked hours
- **THEN** the submission is blocked client-side (submit disabled) and, if attempted directly, rejected server-side with an error

#### Scenario: Empty cart
- **WHEN** a user has not added any items to the cart
- **THEN** the submission is blocked, consistent with today's requirement that a prize must be selected

#### Scenario: Server does not trust client-submitted budget
- **WHEN** the submit endpoint receives a cart payload
- **THEN** it re-derives tracked hours from the authenticated session (Hackatime data or the submitted self-reported hours per track, unchanged from today) and validates the cart total against that server-derived value, not any client-computed total

### Requirement: Cart serialization into the submission record
The submitted cart SHALL be serialized into the existing `Prize` Airtable field as a comma-separated list of `"<item name> ×<quantity>"` entries, with no new Airtable fields introduced.

#### Scenario: Cart serialized on submission
- **WHEN** a submission with a multi-item cart is created
- **THEN** the `Prize` field contains each selected item's name and quantity in the format `"<name> ×<quantity>"`, separated by commas

### Requirement: No cross-submission spend ledger
The cart budget check SHALL be scoped to the current submission's tracked hours only. No record of previously-redeemed or previously-spent hours from other submissions SHALL be checked or maintained.

#### Scenario: Resubmission re-spends the same hours
- **WHEN** a user submits a second project or submission using tracked hours that overlap with a prior submission's tracked hours
- **THEN** the cart budget check considers only the current submission's tracked hours, without checking or reducing based on any prior submission
