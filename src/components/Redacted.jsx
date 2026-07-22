'use client'

import { useEffect, useRef, useState } from 'react'

// Covers children with a black censor bar; reveals on hover (pointer input)
// or when scrolled into view (touch input without hover support).
export default function Redacted({ children, className = '' }) {
  const [revealed, setRevealed] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      className={`relative inline-block cursor-default group ${className}`}
      onMouseEnter={() => setRevealed(true)}
    >
      <span
        aria-hidden={!revealed}
        className={`absolute inset-0 bg-surface-container-lowest transition-opacity duration-500 ${
          revealed ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span>{children}</span>
    </span>
  )
}
