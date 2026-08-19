const TRACES = [
  { d: 'M -20 120 L 180 120 L 240 180 L 470 180 L 520 130 L 760 130', vias: [[180, 120], [470, 180]] },
  { d: 'M -20 150 L 160 150 L 220 210 L 470 210 L 540 140 L 760 140', vias: [[220, 210]] },
  { d: 'M -20 180 L 140 180 L 200 240 L 460 240', vias: [[460, 240]] },
  { d: 'M 90 -20 L 90 300 L 150 360 L 150 620 L 210 680 L 210 940', vias: [[150, 360], [210, 680]] },
  { d: 'M 120 -20 L 120 280 L 180 340 L 180 600', vias: [[180, 340]] },
  { d: 'M 1620 60 L 1300 60 L 1240 120 L 1000 120 L 940 60 L 700 60', vias: [[1240, 120], [940, 60]] },
  { d: 'M 1620 92 L 1320 92 L 1260 152 L 1010 152', vias: [[1260, 152]] },
  { d: 'M 1420 -20 L 1420 240 L 1360 300 L 1360 560 L 1420 620 L 1420 940', vias: [[1360, 300], [1420, 620]] },
  { d: 'M -20 700 L 300 700 L 360 640 L 620 640 L 680 700 L 1000 700', vias: [[360, 640], [680, 700]] },
  { d: 'M -20 730 L 290 730 L 350 670 L 610 670', vias: [[610, 670]] },
  { d: 'M 500 940 L 500 800 L 560 740 L 820 740 L 880 800 L 880 940', vias: [[560, 740], [880, 800]] },
  { d: 'M 1620 820 L 1240 820 L 1180 760 L 900 760', vias: [[1180, 760]] },
]

const SIGNAL = new Set([3, 8])

export default function Traces({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {TRACES.map((t, i) => {
        const signal = SIGNAL.has(i)
        const stroke = signal ? 'var(--accent, #E5231B)' : '#111111'
        const opacity = signal ? 0.16 : 0.13
        return (
          <g key={t.d} stroke={stroke} opacity={opacity}>
            <path
              d={t.d}
              strokeWidth={signal ? 2 : 1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {t.vias.map(([cx, cy]) => (
              <g key={`${cx}-${cy}`}>
                <circle cx={cx} cy={cy} r="5" strokeWidth={signal ? 2 : 1.5} />
                <circle cx={cx} cy={cy} r="1.6" strokeWidth="1.5" />
              </g>
            ))}
          </g>
        )
      })}

      <g stroke="#111111" opacity="0.1" strokeWidth="1.5">
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={210 + i * 46} y={876} width="26" height="44" />
        ))}
      </g>
    </svg>
  )
}
