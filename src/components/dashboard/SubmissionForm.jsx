'use client'

function ReadOnlyField({ label, value }) {
  return (
    <div>
      <p className="font-data text-[10px] tracking-widest text-ink/65 uppercase mb-1">
        {label}
      </p>
      <p className="border border-ink/15 bg-plate px-3 py-2 text-sm text-ink">
        {value || 'N/A'}
      </p>
    </div>
  )
}

function TextField({ label, name, value, onChange, errors, type = 'text', textarea = false }) {
  const Component = textarea ? 'textarea' : 'input'
  const hasError = Boolean(errors[name])
  return (
    <div>
      <label className="font-data text-[10px] tracking-widest text-ink/65 uppercase mb-1 block">
        {label}
      </label>
      <Component
        type={textarea ? undefined : type}
        rows={textarea ? 4 : undefined}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full border bg-plate px-3 py-2 text-sm text-ink focus:outline-none ${
          hasError ? 'border-error' : 'border-ink/15 focus:border-ink'
        }`}
      />
      {hasError && <p className="text-error text-xs mt-1 font-data">{errors[name]}</p>}
    </div>
  )
}

export default function SubmissionForm({
  profile,
  category,
  fields,
  onFieldChange,
  onScreenshotChange,
  screenshotName,
  errors,
}) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-data text-xs text-signal tracking-widest uppercase mb-3">
          Identity (from Hack Club OAuth)
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          <ReadOnlyField label="First Name" value={profile.firstName} />
          <ReadOnlyField label="Last Name" value={profile.lastName} />
          <ReadOnlyField label="Email" value={profile.email} />
          <TextField
            label="GitHub Username"
            name="githubUsername"
            value={fields.githubUsername}
            onChange={onFieldChange}
            errors={errors}
          />
        </div>
      </div>

      <div>
        <p className="font-data text-xs text-signal tracking-widest uppercase mb-3">
          Birthday &amp; address
        </p>
        <p className="text-ink/65 text-xs font-data mb-3">
          basic stuff we need
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="Birthday"
            name="birthday"
            type="date"
            value={fields.birthday}
            onChange={onFieldChange}
            errors={errors}
          />
          <TextField
            label="Address Line 1"
            name="addressLine1"
            value={fields.addressLine1}
            onChange={onFieldChange}
            errors={errors}
          />
          <TextField
            label="Address Line 2 (optional)"
            name="addressLine2"
            value={fields.addressLine2}
            onChange={onFieldChange}
            errors={errors}
          />
          <TextField
            label="City"
            name="city"
            value={fields.city}
            onChange={onFieldChange}
            errors={errors}
          />
          <TextField
            label="State / Province"
            name="state"
            value={fields.state}
            onChange={onFieldChange}
            errors={errors}
          />
          <TextField
            label="Country"
            name="country"
            value={fields.country}
            onChange={onFieldChange}
            errors={errors}
          />
          <TextField
            label="Zip Code"
            name="zip"
            value={fields.zip}
            onChange={onFieldChange}
            errors={errors}
          />
        </div>
      </div>

      <div>
        <p className="font-data text-xs text-signal tracking-widest uppercase mb-3">
          Project details
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <TextField
            label="Playable URL"
            name="playableUrl"
            value={fields.playableUrl}
            onChange={onFieldChange}
            errors={errors}
          />
          <TextField
            label="Code URL"
            name="codeUrl"
            value={fields.codeUrl}
            onChange={onFieldChange}
            errors={errors}
          />
          {category === 'hardware' && (
            <TextField
              label="Journal Link"
              name="journalLink"
              value={fields.journalLink}
              onChange={onFieldChange}
              errors={errors}
            />
          )}
        </div>
        <div className="mt-4">
          <label className="font-data text-[10px] tracking-widest text-ink/65 uppercase mb-1 block">
            Screenshot
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onScreenshotChange(e.target.files?.[0] ?? null)}
            className={`w-full border bg-plate px-3 py-2 text-sm text-ink file:mr-3 file:border-0 file:bg-ground file:px-3 file:py-1 file:font-data file:text-xs ${
              errors.screenshot ? 'border-error' : 'border-ink/15'
            }`}
          />
          {screenshotName && (
            <p className="text-ink/65 text-xs mt-1 font-data">{screenshotName}</p>
          )}
          {errors.screenshot && (
            <p className="text-error text-xs mt-1 font-data">{errors.screenshot}</p>
          )}
        </div>
        <div className="mt-4">
          <TextField
            label="Description"
            name="description"
            value={fields.description}
            onChange={onFieldChange}
            errors={errors}
            textarea
          />
        </div>
        <div className="mt-4">
          <TextField
            label="Anything we should know (want to substitute a prize of something of the same value)?"
            name="comments"
            value={fields.comments}
            onChange={onFieldChange}
            errors={errors}
            textarea
          />
        </div>
      </div>
    </div>
  )
}
