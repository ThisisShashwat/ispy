import { WorksheetGrid, DimensionRule } from './Worksheet'

export function Eyebrow({ children }) {
  return (
    <p className="font-data text-[10px] uppercase tracking-[0.18em] text-ink/50">
      {children}
    </p>
  )
}

export function Heading({ children, as: Tag = 'h2' }) {
  return (
    <Tag
      className="mt-4 font-display font-extrabold text-ink"
      style={{
        fontSize: 'clamp(1.7rem,3.2vw,2.9rem)',
        fontVariationSettings: '"BLED" 10, "SCAN" 0',
        lineHeight: 0.98,
        letterSpacing: '-0.005em',
      }}
    >
      {children}
    </Tag>
  )
}

export function Section({ id, eyebrow, heading, intro, children, tone = 'ground' }) {
  return (
    <section
      id={id}
      className={`relative border-t border-ink/15 px-5 py-16 sm:px-8 sm:py-24 ${
        tone === 'plate' ? 'bg-plate' : ''
      }`}
    >
      <WorksheetGrid dense={false} />
      <div className="relative mx-auto max-w-[1500px]">
        <DimensionRule label={eyebrow} />
        <Heading>{heading}</Heading>
        {intro && (
          <p className="mt-5 max-w-2xl font-data text-[12px] leading-[1.8] text-ink/70">
            {intro}
          </p>
        )}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}
