'use client'

import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import TerminalPane from '../TerminalPane'

const steps = [
  {
    step: '01',
    title: 'Choose your target device',
    desc: "have any idea, it doesn't have to be crazy hard",
  },
  {
    step: '02',
    title: 'Build it for real',
    desc: 'Design it, build it, debug it. It has to actually work (some exceptions for hardware projects).',
  },
  {
    step: '03',
    title: 'Ship it publicly',
    desc: 'Publish your project: repo, build, or hardware demo.',
  },
  {
    step: '04',
    title: 'Get rewarded',
    desc: 'we will ship you stuff in exchange for what you shipped',
  },
]

function Step({ s, index }) {
  const [ref, visible] = useRevealOnScroll()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 120}ms` : '0ms' }}
      className={`flex gap-4 transition-all duration-500 ${
        visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
      }`}
    >
      <span className="font-mono text-3xl font-bold text-primary-container text-glow">
        {s.step}
      </span>
      <div>
        <p className="font-bold text-on-background mb-1">{s.title}</p>
        <p className="text-on-surface-variant">{s.desc}</p>
      </div>
    </div>
  )
}

export default function HowItWorks() {
  return (
    <TerminalPane id="how-it-works" path="man protocol" className="bg-surface">
      <div className="px-6 py-20 bg-grid">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-primary-container tracking-[0.3em] text-sm mb-4">
            CASE FILE 004 — PROTOCOL
          </p>
          <h2
            data-text="How it works"
            className="glitch-title text-3xl sm:text-4xl font-bold text-on-background mb-10"
          >
            How it works
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {steps.map((s, i) => (
              <Step key={s.step} s={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </TerminalPane>
  )
}
