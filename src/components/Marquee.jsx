const DEFAULT_ITEMS = [
  'CLEARANCE REQUIRED',
  'SURVEILLANCE OPERATIONAL',
  'DO NOT DISTRIBUTE',
  'ASSET STATUS: ACTIVE',
  'EYES ONLY',
  'TRANSMISSION SECURE',
]

export default function Marquee({ items = DEFAULT_ITEMS }) {
  return (
    <div className="flex flex-wrap items-stretch bg-surface-container border-y border-outline">
      {items.map((item) => (
        <span
          key={item}
          className="font-mono text-on-background tracking-[0.2em] text-[10px] sm:text-xs px-4 py-2 border-r border-outline-variant last:border-r-0"
        >
          {item}
        </span>
      ))}
    </div>
  )
}
