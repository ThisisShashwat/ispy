'use client'

import { useEffect, useRef } from 'react'

const CELL = 88

export default function CursorTracker() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia?.('(hover: none)').matches) return

    const host = el.parentElement
    if (!host) return

    let frame = 0
    let x = 0
    let y = 0

    const paint = () => {
      frame = 0
      el.style.setProperty('--cx', `${x}px`)
      el.style.setProperty('--cy', `${y}px`)
      el.style.setProperty('--gx', `${Math.floor(x / CELL) * CELL}px`)
      el.style.setProperty('--gy', `${Math.floor(y / CELL) * CELL}px`)
      const readout = el.querySelector('[data-readout]')
      if (readout) {
        readout.textContent = `X:${String(Math.round(x)).padStart(4, '0')}  Y:${String(
          Math.round(y),
        ).padStart(4, '0')}`
      }
    }

    const onMove = (e) => {
      const r = host.getBoundingClientRect()
      x = e.clientX - r.left
      y = e.clientY - r.top
      el.style.setProperty('--on', '1')
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const onLeave = () => el.style.setProperty('--on', '0')

    host.addEventListener('mousemove', onMove, { passive: true })
    host.addEventListener('mouseleave', onLeave)
    return () => {
      host.removeEventListener('mousemove', onMove)
      host.removeEventListener('mouseleave', onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      style={{ '--cx': '-999px', '--cy': '-999px', '--gx': '-999px', '--gy': '-999px', '--on': '0' }}
    >
      <div
        className="absolute transition-opacity duration-300"
        style={{
          left: 'var(--gx)',
          top: 'var(--gy)',
          width: `${CELL}px`,
          height: `${CELL}px`,
          background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
          borderTop: '1px solid color-mix(in srgb, var(--accent) 50%, transparent)',
          borderLeft: '1px solid color-mix(in srgb, var(--accent) 50%, transparent)',
          opacity: 'var(--on)',
        }}
      />
      <div
        className="absolute left-0 h-px w-full transition-opacity duration-300"
        style={{
          top: 'var(--cy)',
          background: 'color-mix(in srgb, var(--accent) 30%, transparent)',
          opacity: 'var(--on)',
        }}
      />
      <div
        className="absolute top-0 h-full w-px transition-opacity duration-300"
        style={{
          left: 'var(--cx)',
          background: 'color-mix(in srgb, var(--accent) 30%, transparent)',
          opacity: 'var(--on)',
        }}
      />
      <span
        data-readout
        className="absolute whitespace-nowrap font-data text-[9px] font-bold tracking-[0.1em] text-signal transition-opacity duration-300"
        style={{
          left: 'calc(var(--cx) + 12px)',
          top: 'calc(var(--cy) + 10px)',
          opacity: 'var(--on)',
        }}
      />
    </div>
  )
}
