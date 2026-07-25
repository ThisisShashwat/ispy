'use client'

import { useEffect, useRef, useState } from 'react'

const FOOTPRINT_MIN_INTERVAL = 220
const FOOTPRINT_MIN_DISTANCE = 28
const FOOTPRINT_LIFETIME = 1400
const MAX_FOOTPRINTS = 16

let nextFootprintId = 0

export default function CursorTrail() {
  const targetRef = useRef(null)
  const lastDropAtRef = useRef(0)
  const lastPosRef = useRef(null)
  const [footprints, setFootprints] = useState([])
  const [active, setActive] = useState(false)

  useEffect(() => {
    const handleMove = (e) => {
      const { clientX: x, clientY: y } = e
      setActive(true)

      if (targetRef.current) {
        targetRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      }

      const last = lastPosRef.current
      const now = performance.now()

      if (!last) {
        lastPosRef.current = { x, y }
        return
      }

      const dx = x - last.x
      const dy = y - last.y
      const distance = Math.hypot(dx, dy)

      if (
        distance > FOOTPRINT_MIN_DISTANCE &&
        now - lastDropAtRef.current > FOOTPRINT_MIN_INTERVAL
      ) {
        lastDropAtRef.current = now
        lastPosRef.current = { x, y }

        const angle = (Math.atan2(dy, dx) * 180) / Math.PI
        const id = nextFootprintId++
        const left = id % 2 === 0
        const color = Math.random() < 0.5 ? 'text-red-500' : 'text-white'

        setFootprints((prev) => [
          ...prev.slice(-(MAX_FOOTPRINTS - 1)),
          { id, x, y, angle, left, color },
        ])

        setTimeout(() => {
          setFootprints((prev) => prev.filter((f) => f.id !== id))
        }, FOOTPRINT_LIFETIME)
      }
    }

    const handleLeave = () => setActive(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 hidden sm:block"
    >
      {footprints.map((f) => (
        <svg
          key={f.id}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`absolute w-3.5 h-3.5 animate-footprint-fade ${f.color}`}
          style={{
            left: f.x,
            top: f.y,
            '--rot': `${f.angle}deg`,
            '--mirror': f.left ? 1 : -1,
          }}
        >
          <ellipse cx="12" cy="15.5" rx="5.5" ry="7.5" />
          <circle cx="7" cy="4.2" r="1.9" />
          <circle cx="11.2" cy="2.6" r="2.1" />
          <circle cx="15.4" cy="3.2" r="1.9" />
          <circle cx="18.6" cy="5.4" r="1.5" />
        </svg>
      ))}

      <div
        ref={targetRef}
        className={`absolute top-0 left-0 w-4 h-4 transition-opacity duration-300 ${
          active ? 'opacity-70' : 'opacity-0'
        }`}
        style={{ transitionProperty: 'opacity' }}
      >
        <div className="absolute inset-0 rounded-full border border-red-500" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-red-500/70" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-red-500/70" />
      </div>
    </div>
  )
}
