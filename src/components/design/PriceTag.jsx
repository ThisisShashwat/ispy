const HOLE = 'radial-gradient(circle 3.5px at 15px 12px, transparent 98%, #000 100%)'

export default function PriceTag({ hours, leader = 34, className = '', style }) {
  return (
    <div
      className={`pointer-events-none absolute z-20 ${className}`}
      style={{ ...style, transform: 'rotate(-4deg)' }}
    >
      <div
        aria-hidden="true"
        className="absolute bottom-full left-[15px] w-px bg-ink/45"
        style={{ height: leader }}
      />
      <div
        className="flex items-baseline gap-[3px] border border-ink bg-plate pl-[26px] pr-3 py-1.5"
        style={{
          maskImage: HOLE,
          WebkitMaskImage: HOLE,
          boxShadow: '2px 2px 0 0 rgba(15,17,20,0.16)',
        }}
      >
        <span className="font-data text-[15px] font-bold leading-none tabular-nums text-signal">
          {hours}
        </span>
        <span className="font-data text-[9px] font-bold leading-none text-ink/70">H</span>
      </div>
    </div>
  )
}
