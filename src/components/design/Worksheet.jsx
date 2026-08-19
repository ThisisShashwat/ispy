import Traces from './Traces'

export function WorksheetGrid({ dense = true }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {dense && <Traces />}
      <div className="grain-overlay absolute inset-0 opacity-[0.05] mix-blend-multiply" />
    </div>
  )
}

export function RegistrationMarks() {
  const mark = 'absolute h-4 w-4 border-ink/25'
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className={`${mark} left-5 top-5 border-l border-t`} />
      <span className={`${mark} right-5 top-5 border-r border-t`} />
      <span className={`${mark} bottom-5 left-5 border-b border-l`} />
      <span className={`${mark} bottom-5 right-5 border-b border-r`} />
    </div>
  )
}

export function DimensionRule({ label }) {
  return (
    <div aria-hidden="true" className="flex items-center gap-3 text-ink/30">
      <span className="h-2.5 w-px bg-current" />
      <span className="h-px flex-1 bg-current" />
      <span className="whitespace-nowrap font-data text-[9px] uppercase tracking-[0.24em] text-ink/55">
        {label}
      </span>
      <span className="h-px flex-1 bg-current" />
      <span className="h-2.5 w-px bg-current" />
    </div>
  )
}
