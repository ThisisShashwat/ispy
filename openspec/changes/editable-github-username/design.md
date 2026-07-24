## Context

`SubmissionForm.jsx` renders an "Identity (from Hack Club OAuth)" block with four fields, all currently rendered via `<ReadOnlyField>`: First Name, Last Name, Email, GitHub Username. The first three are genuinely identity-verified via OAuth and should stay locked. GitHub Username is different in practice: it's used only for submission attribution (linking a project to a GitHub account for judging/display), not as an auth or identity guarantee — so treating it with the same rigidity as email/name has been actively harmful, since GitHub usernames are self-changeable and OAuth linkage isn't guaranteed at signup.

This surfaced as a hard blocker for hardware-category submitters, who either renamed their GitHub username after OAuth first captured it, or never linked GitHub via OAuth in the first place (leaving `profile.githubUsername` empty with no way to fill it in).

## Goals / Non-Goals

**Goals:**
- Let users correct or provide their GitHub username at submission time.
- Keep the fix scoped to the submission form and its payload — no changes to auth/OAuth flow or profile storage.
- Preserve pre-fill behavior when the OAuth-cached value is already correct.

**Non-Goals:**
- Writing the corrected value back to the user's profile record. A correction applies to the current submission only; a future submission re-seeds from the OAuth-cached value and can be edited again if still wrong.
- Any validation (format checking, non-empty enforcement, GitHub existence check). The field behaves like any other free-text `TextField` in this form today — no validation is added or expected.
- Re-syncing `profile.githubUsername` from GitHub/OAuth on login. That would address staleness at the source, but is out of scope here.

## Decisions

**Move GitHub Username from `profile`-driven read-only display to `fields`-driven editable input.**
The other three identity fields stay as `<ReadOnlyField>` reading directly from `profile`. GitHub Username switches to `<TextField>` reading from `fields.githubUsername`, following the exact same pattern already used for `birthday`, `addressLine1`, etc. (`value`, `onChange={onFieldChange}`, `errors`). No new component or pattern is introduced.

*Alternative considered*: add an explicit "edit" toggle that starts read-only and switches to an input on click. Rejected — adds UI complexity and state for no real benefit; every other field in this form is a plain always-editable input, and consistency is simpler to reason about than a hybrid locked/unlockable field.

**Seed `fields.githubUsername` from `profile.githubUsername` at form/state initialization, not inside `SubmissionForm` itself.**
`SubmissionForm` is presentational — it receives `fields` and `onFieldChange` from `DashboardClient.jsx`, which owns the actual `fields` state (`EMPTY_FIELDS`) and builds the submit payload (`body.set(...)` calls) before POSTing to `/api/submit`. The seeding needs to happen in `DashboardClient.jsx`'s `fields` initialization/state, and `githubUsername` needs to be added to the set of fields serialized into the submit `FormData` body.

**Carve out `githubUsername` from the submit route's "never trust client identity" guard.**
`src/app/api/submit/route.js` currently re-derives identity fields (name, email, and — bundled in with them — `githubUsername`) server-side from the session's OAuth/Hackatime tokens, explicitly to avoid trusting client-submitted identity data (see the existing comment at the top of the handler). `githubUsername` was swept into that guard by association, not because it's actually security-relevant in the way name/email/hours are — it's used purely for submission attribution, per the proposal's scoping.

This change updates `route.js` to read `formData.get('githubUsername')` and use it directly (client value wins outright) instead of `hackatimeMe?.github_username`, while leaving `identity` (name/email) and Hackatime hours untouched — those remain server-derived only. This is a narrow, explicit carve-out of one field from the guard, not a removal of the guard itself; the code should make clear via comment why `githubUsername` is treated differently from its neighbors in that block.

**No write-back to profile.**
Confirmed scope: the corrected value is submission-only. This avoids touching profile storage, any OAuth re-validation logic, or downstream consumers of `profile.githubUsername` that assume it's OAuth-sourced.

**No validation.**
Confirmed scope: matches current behavior of sibling fields (`playableUrl`, `codeUrl`, `description`, etc.), none of which currently enforce format or presence in this form. Adding validation only to this field would be inconsistent; broader form validation is out of scope for this change.

## Risks / Trade-offs

- **[Risk]** A user submits with a garbage/typo'd GitHub username since there's no validation → **Mitigation**: Accepted trade-off per explicit scope decision; this field was already unreliable (stale OAuth cache) and submission-side review/judging is the existing backstop for bad data in free-text fields generally.
- **[Risk]** Because the correction doesn't persist to the profile, users submitting multiple projects must re-enter the correction each time → **Mitigation**: Accepted trade-off per explicit scope decision (submission-only); can be revisited later as a follow-up if repeat-submission friction turns out to matter.
- **[Risk]** Something downstream keys off `profile.githubUsername` directly (not the submission's stored value) expecting it to reflect the corrected value → **Mitigation**: Confirmed in proposal that `githubUsername` is submission-purposes-only; verify during implementation that the submission payload (not `profile`) is what's read by judging/attribution/display, and grep for other `profile.githubUsername` reads before landing.
- **[Risk]** Carving `githubUsername` out of the submit route's "never trust client identity" guard could be read later as an oversight, or the pattern could be copy-pasted to genuinely security-relevant fields → **Mitigation**: Add an explicit code comment at the carve-out in `route.js` explaining why this field (submission attribution only, not auth/identity-bearing) is handled differently from `identity`/hours in the same block.

## Migration Plan

No data migration needed — this only changes form rendering and the shape of the submitted payload (which gains an explicit `githubUsername` value instead of implicitly trusting `profile`). Deploy as a standard code change. Rollback is a plain revert; no persisted state depends on the new behavior.

## Open Questions

- None blocking. If repeat hardware submitters report re-entering the same correction across multiple submissions, revisit the "submission-only, no persistence" decision as a fast follow.
