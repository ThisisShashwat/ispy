## 1. Submission form UI

- [x] 1.1 In `src/components/dashboard/SubmissionForm.jsx`, replace the `<ReadOnlyField label="GitHub Username" value={profile.githubUsername} />` with a `<TextField label="GitHub Username" name="githubUsername" value={fields.githubUsername} onChange={onFieldChange} errors={errors} />`, matching the pattern used by the other editable fields in the form.

## 2. Form state and submit payload

- [x] 2.1 In `src/components/dashboard/DashboardClient.jsx`, add a `githubUsername` key to `EMPTY_FIELDS`.
- [x] 2.2 Seed `fields.githubUsername` from `profile.githubUsername` when the form/fields state is initialized (or on category/profile availability), so the field pre-fills with the OAuth-cached value.
- [x] 2.3 Add `body.set('githubUsername', fields.githubUsername)` alongside the existing `body.set(...)` calls in the submit handler, so the value reaches `/api/submit`.
- [x] 2.4 Confirm `githubUsername` is not added to `REQUIRED_TEXT_FIELDS` or the `validate()` required-fields check — no validation should be introduced.

## 3. Submit API route

- [x] 3.1 In `src/app/api/submit/route.js`, read the submitted value: `const githubUsername = formData.get('githubUsername')?.toString() ?? ''`.
- [x] 3.2 Replace `[AIRTABLE_FIELDS.githubUsername]: hackatimeMe?.github_username ?? ''` with `[AIRTABLE_FIELDS.githubUsername]: githubUsername`, using the client-submitted value directly.
- [x] 3.3 Add a comment at this line explaining why `githubUsername` is trusted from the client while `identity` (name/email) and Hackatime-derived hours in the same handler are not: it's submission-attribution-only, not identity/auth-bearing, and is deliberately user-correctable to fix stale/missing OAuth GitHub linkage.
- [x] 3.4 Verify `hackatimeMe` is still needed elsewhere in the route (e.g. for hours/project data) before deciding whether to leave the `getHackatimeMe` call as-is or adjust it — do not remove it if other fields still depend on it.
  - `hackatimeMe` had no other usage beyond the required-field check for GitHub Username. Removed the `getHackatimeMe` call/import and the now-obsolete `'Github Username'` entry in `requiredCheck` (that check enforced non-empty and was the literal cause of the submission block for hardware users with no OAuth-linked GitHub — leaving it in place would have contradicted the agreed "no validation, empty accepted" scope).

## 4. Verification

- [ ] 4.1 Manually test: submit a hardware project with a corrected GitHub username different from the OAuth-cached one; confirm the Airtable record reflects the corrected value.
- [ ] 4.2 Manually test: a profile with no OAuth-linked GitHub account (empty `profile.githubUsername`) can still fill in a value and submit successfully.
- [ ] 4.3 Manually test: submitting with the GitHub Username field left empty is not blocked (no validation error).
- [ ] 4.4 Confirm a second, separate submission by the same user re-seeds the field from the original OAuth-cached profile value (i.e. the earlier correction did not persist to `profile`).
