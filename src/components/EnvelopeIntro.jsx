'use client'

import { useEffect, useState } from 'react'

const SESSION_KEY = 'ispy-intro-played'

// Full-screen "classified envelope" gate that plays once per tab session,
// then unmounts to reveal the page underneath.
export default function EnvelopeIntro() {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const alreadyPlayed =
    typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === '1'

  const [stage, setStage] = useState(
    prefersReducedMotion || alreadyPlayed ? 'done' : 'sealed',
  )

  useEffect(() => {
    if (stage === 'done') return
    sessionStorage.setItem(SESSION_KEY, '1')

    // Scheduled once on mount — do not depend on `stage`, or each stage
    // change would re-trigger this effect and reschedule every timer again.
    const t1 = setTimeout(() => setStage('opening'), 500)
    const t2 = setTimeout(() => setStage('sliding'), 1150)
    const t3 = setTimeout(() => setStage('done'), 2300)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (stage === 'done') return null

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
      style={{ perspective: '1000px' }}
    >
      <div className="relative w-64 sm:w-80 h-44 sm:h-52">
        <div className="absolute inset-0 bg-surface-container border border-outline" />

        <div
          className="absolute inset-x-0 top-0 h-1/2 bg-surface-container-high border border-outline"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            transformOrigin: 'top',
            transform: stage === 'sealed' ? 'rotateX(0deg)' : 'rotateX(-180deg)',
            transition: 'transform 0.6s ease-in',
          }}
        />

        {stage === 'sealed' && (
          <div className="absolute inset-0 flex items-center justify-center animate-stamp-drop">
            <div className="w-14 h-14 bg-primary-container border border-on-primary-container flex items-center justify-center text-on-primary-container font-mono text-[9px] font-bold text-center leading-tight">
              CLASS
              <br />
              IFIED
            </div>
          </div>
        )}

        {(stage === 'opening' || stage === 'sliding') && (
          <div
            className={`absolute inset-x-4 top-6 bottom-4 bg-surface-container-low border border-outline flex flex-col items-center justify-center p-4 ${
              stage === 'sliding' ? 'animate-letter-out' : ''
            }`}
          >
            <p className="font-mono text-secondary-container tracking-[0.2em] text-[10px] mb-2">
              TOP SECRET
            </p>
            <p className="font-mono text-2xl font-bold text-primary-container text-glow tracking-widest">
              ISPY
            </p>
            <div className="w-full h-1.5 bg-on-background/10 mt-3" />
            <div className="w-2/3 h-1.5 bg-on-background/10 mt-1.5" />
          </div>
        )}
      </div>
    </div>
  )
}
