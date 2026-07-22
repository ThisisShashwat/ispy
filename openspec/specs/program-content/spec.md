# program-content Specification

## Requirements

### Requirement: Program briefing content
The briefing section SHALL explain, in spy-dossier framed language, that ISpy is a Hack Club YSWS program in which students build and ship a real technical project in exchange for prizes, and SHALL avoid exposing raw internal funding formulas (e.g. per-hour dollar payout math) to the reader.

#### Scenario: Briefing section renders
- **WHEN** the briefing section is displayed
- **THEN** it describes the program's ship-a-real-project-for-prizes premise without displaying dollar-per-hour or per-weighted-project payout figures

### Requirement: Arsenal example content
The arsenal section SHALL present a small, illustrative, non-exhaustive set of example spy-tool project ideas (such as a keylogger, a hidden-camera robot, a network sniffer, or an OSINT tool) to communicate the deliberately broad scope of eligible projects.

#### Scenario: Arsenal section renders
- **WHEN** the arsenal section is displayed
- **THEN** it lists multiple distinct example project ideas spanning both software and hardware, and indicates or implies these are illustrative rather than an exhaustive list

### Requirement: How-it-works content
The how-it-works section SHALL describe the ship-to-reward flow (build and publish a real project, receive prizes) in simplified, prize-forward terms rather than exposing the underlying weighted-project dollar accounting.

#### Scenario: How it works section renders
- **WHEN** the how-it-works section is displayed
- **THEN** it communicates that shipping a real project leads to earning prizes, without displaying the $85-per-weighted-project or $8.50-per-hour figures

### Requirement: Placeholder CTA
The page SHALL present an "apply" call-to-action in both the hero and footer/closing sections. The CTA SHALL be visually functional (styled, clickable) but SHALL NOT link to a real, finalized application destination.

#### Scenario: Hero CTA present
- **WHEN** the hero section is displayed
- **THEN** an apply-styled call-to-action control is visible and styled consistently with the dossier theme

#### Scenario: Footer CTA present
- **WHEN** the footer/closing section is displayed
- **THEN** an apply-styled call-to-action control is visible, matching the hero CTA's intent

#### Scenario: CTA destination is a placeholder
- **WHEN** a user activates either CTA control
- **THEN** the action is a placeholder (e.g. a non-functional link, `#`, or clearly marked stub) rather than a real application flow
