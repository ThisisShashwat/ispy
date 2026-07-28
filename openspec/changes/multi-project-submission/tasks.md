## 1. ProjectPicker: multi-select

- [x] 1.1 Change `ProjectPicker` props/usage from a single `selectedProject` to a `selectedProjects` array
- [x] 1.2 Update the card's `selected` check to membership (`selectedProjects.some(p => p.name === project.name)`) instead of equality against a single value
- [x] 1.3 Update `onSelect` call sites so clicking a card toggles that project in/out of the array rather than replacing it

## 2. DashboardClient: selection state and hours summing

- [x] 2.1 Replace `selectedProject` state with `selectedProjects` (array, default `[]`)
- [x] 2.2 Update `handleSelectProject` (or equivalent) to toggle membership in `selectedProjects` by project name
- [x] 2.3 Update `hoursTracked` calculation to sum `total_seconds` across all `selectedProjects` and convert to hours once
- [x] 2.4 Update `trackIdentified` (or equivalent gating logic) to check `selectedProjects.length > 0` instead of a single truthy value
- [x] 2.5 Update the tracked-hours display label to join selected project names (e.g. `selectedProjects.map(p => p.name).join(', ')`)
- [x] 2.6 Update category/reset handlers that clear `selectedProject` to clear `selectedProjects` (reset to `[]`)
- [x] 2.7 Update the submit handler to send all selected project names as a single comma-joined string under the existing `projectName` form field

## 3. /api/submit: server-side multi-project resolution

- [x] 3.1 Parse the submitted `projectName` field as a comma-separated list, trimming each entry
- [x] 3.2 Re-fetch the authoritative Hackatime project list for the session (already done today) and resolve each submitted name against it
- [x] 3.3 Reject the submission with a 400 error (same style as today's "Selected project not found on Hackatime") if any submitted name fails to resolve, with no Airtable record created
- [x] 3.4 Compute `hoursTracked` server-side as the sum of `total_seconds` across all matched projects, divided by 3600
- [x] 3.5 Confirm the existing `overrideHours` Airtable field write is unchanged (still receives the single summed hours number) and no project-name field is added anywhere in the write path

## 4. Verification

- [ ] 4.1 Manually test: select zero, one, and multiple projects; confirm the summed hours and label update correctly at each step
- [ ] 4.2 Manually test: deselect down to zero projects and confirm the flow returns to the "no project selected" state cleanly
- [ ] 4.3 Manually test: submit with multiple selected projects and confirm the created Airtable record's hours match the sum, with no project name persisted
- [ ] 4.4 Manually test: submit with a tampered/invalid project name (e.g. via devtools) and confirm the server rejects the submission
- [ ] 4.5 Manually test: hardware category submission still works unchanged
