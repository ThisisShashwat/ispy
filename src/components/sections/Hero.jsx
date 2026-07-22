'use client'

import { useDecryptText } from '../../hooks/useDecryptText'
import TerminalPane from '../TerminalPane'

const BOOT_LOG = [
  '[ OK ] Mounting /dev/surveillance',
  '[ OK ] Loading agent profile...',
  '[ ** ] Awaiting authorization',
]

export default function Hero() {
  const headline = useDecryptText('ISPY')

  return (
    <TerminalPane id="hero" host="root@ispy" path="./boot.sh" className="bg-surface">
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 bg-grid overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-32 w-[36rem] h-[36rem] rounded-full opacity-20"
          style={{
            background:
              'conic-gradient(from 0deg, transparent 0deg, rgba(0,255,65,0.6) 25deg, transparent 60deg)',
          }}
        >
          <div className="w-full h-full animate-radar rounded-full" style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(0,255,65,0.7) 20deg, transparent 55deg)',
          }} />
        </div>

        <div className="absolute top-6 left-6 font-mono text-[10px] sm:text-xs text-on-surface-variant/70 text-left space-y-0.5">
          {BOOT_LOG.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <p className="font-mono text-secondary-container tracking-[0.3em] text-sm mb-6 border border-secondary-container px-3 py-1 inline-block animate-stamp-drop">
          TOP SECRET
        </p>

        <h1
          data-text="ISPY"
          className="glitch-title text-glow font-mono text-7xl sm:text-9xl font-bold text-primary-container tracking-widest mb-6"
        >
          {headline}
          <span className="inline-block w-3 sm:w-4 h-14 sm:h-20 bg-primary-container ml-2 align-middle animate-blink" />
        </h1>

        <p className="max-w-xl font-bold text-lg sm:text-3xl text-on-surface-variant mb-10">
          Build something that could watch, listen, or track. Ship it, and get
          paid in cool sh*t.
        </p>
        <a
          href="/api/auth/login"
          className="relative font-mono uppercase tracking-widest border border-primary-container text-primary-container px-8 py-4 hover:bg-primary-container hover:text-on-primary-container transition-colors"
        >
          Accept Mission
        </a>

        <p className="absolute bottom-6 font-mono text-on-surface-variant/50 text-xs tracking-[0.3em] animate-pulse">
          ▼ SCROLL FOR BRIEFING
        </p>
      </div>
    </TerminalPane>
  )
}
