'use client'

import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'
import TerminalPane from '../TerminalPane'

const ideas = [
  {
    codename: 'KEYSTROKE',
    desc: 'A keylogger that captures and reports every press.',
  },
  {
    codename: 'ROVER',
    desc: 'A camera-equipped robot that patrols and streams what it sees.',
  },
  {
    codename: 'WIRETAP',
    desc: 'A network sniffer that surfaces traffic on a target network.',
  },
  {
    codename: 'DOSSIER',
    desc: 'An OSINT tool that compiles public data into a profile.',
  },
]

function IdeaCard({ idea, index }) {
  const [ref, visible] = useRevealOnScroll()
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 120}ms` : '0ms' }}
      className={`border border-outline bg-surface-container-low hover:border-primary-container transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      <div className="border-b border-dashed border-outline-variant px-4 py-2">
        <p className="font-mono text-primary-container text-xs tracking-widest uppercase">
          OPERATION: {idea.codename}
        </p>
      </div>
      <p className="text-on-surface-variant p-4">{idea.desc}</p>
    </div>
  )
}

export default function Arsenal() {
  return (
    <TerminalPane id="arsenal" path="ls -la ./arsenal/" className="bg-surface">
      <div className="px-6 py-20 bg-grid">
        <div className="max-w-5xl mx-auto">
          <p className="font-mono text-primary-container tracking-[0.3em] text-sm mb-4">
            CASE FILE 002 — THE ARSENAL
          </p>
          <h2
            data-text="What can you build?"
            className="glitch-title text-3xl sm:text-4xl font-bold text-on-background mb-3"
          >
            What can you build?
          </h2>
          <p className="text-on-surface-variant text-lg mb-10 max-w-2xl">
            Purposely broad. Software, hardware, or both. These are examples to
            get you thinking,  not the full list of what qualifies.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {ideas.map((idea, i) => (
              <IdeaCard key={idea.codename} idea={idea} index={i} />
            ))}
          </div>
        </div>
      </div>
    </TerminalPane>
  )
}
