## Why

Hardware category submitters are blocked from submitting projects because the GitHub Username field on the submission form is locked to whatever Hack Club OAuth returned. This value is wrong or missing for two common cases: the user renamed their GitHub username after OAuth first linked it, or their OAuth session never linked a GitHub account at all (common for hardware builders). Since the field is read-only, there's no way for these users to correct or fill it in, so they can't complete submission.

## What Changes

- Convert the "GitHub Username" field in `SubmissionForm` from a locked, read-only display (`ReadOnlyField`) to an editable text input (`TextField`), consistent with the other submission fields (birthday, address, project details).
- Seed the field's initial value from `profile.githubUsername` (the OAuth-cached value) so it still pre-fills when correct.
- Route edits through the form's existing `fields` / `onFieldChange` / `errors` state, the same mechanism already used for every other editable field in the form.
- The corrected value is stored only with the submission record — it does not write back to the user's profile or OAuth-cached identity. Other submissions (or a resubmission) will re-seed from the original OAuth value.
- No new validation is introduced. The field follows the same (currently absent) validation behavior as other free-text fields in the form — non-empty is not enforced, format is not checked.

## Capabilities

### New Capabilities
- `project-submission`: Covers the project submission form's field behavior — which identity fields are OAuth-locked vs. user-editable, and how submitted values relate to profile data.

### Modified Capabilities
(none — no existing spec covers this form)

## Impact

- `src/components/dashboard/SubmissionForm.jsx`: GitHub Username field changes from `ReadOnlyField` to `TextField`; its value now lives in the form's `fields` state instead of being read directly off `profile`.
- `src/components/dashboard/DashboardClient.jsx`: `EMPTY_FIELDS` gains a `githubUsername` key seeded from the profile's OAuth-cached value; the submit handler's `FormData` body needs to include `githubUsername` alongside the other fields it already serializes (`body.set('githubUsername', fields.githubUsername)`).
- `src/app/api/submit/route.js`: currently re-derives `githubUsername` server-side from `hackatimeMe?.github_username` as part of a broader "never trust identity from client" guard that also covers name/email/hours. This change reads `formData.get('githubUsername')` and uses it directly instead, carving this one field out of that guard (identity/name/email/hours remain server-derived, unaffected). This is the actual mechanism that unblocks submission — without it, an editable form field alone would still be silently overridden server-side.
- No changes to OAuth flow, profile storage, or database schema — the fix is scoped entirely to the submission form, `DashboardClient`'s payload construction, and the submit route's field-sourcing for this one field.
