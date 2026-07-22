'use client'

import Link from 'next/link'
import { prizes } from '../../data/prizes'
import DossierPhoto from '../DossierPhoto'
import TerminalPane from '../TerminalPane'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

function PrizeItem({ prize, index }) {
  const [ref, visible] = useRevealOnScroll()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 180}ms` : '0ms' }}
      className={`flex flex-col items-center transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <DossierPhoto src={prize.image} alt={prize.name} label={prize.clearanceLevel} />
      <p className="mt-6 font-mono uppercase tracking-widest text-on-background font-bold text-lg">
        {prize.name}
      </p>
    </div>
  )
}

export default function Prizes() {
  return (
    <TerminalPane id="prizes" path="./reward_shop.py --tier" className="bg-surface">
      <div className="px-6 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <p className="font-mono text-primary-container tracking-[0.3em] text-sm mb-4">
            CASE FILE 003 — Prizes
          </p>
          <h2
            data-text="The Reward"
            className="glitch-title text-3xl sm:text-4xl font-bold text-on-background mb-3"
          >
            The Reward
          </h2>
          <p className="text-on-surface-variant text-lg mb-16 max-w-2xl mx-auto">
            Ship a real project, walk away with real field equipment.
          </p>
          <div className="grid sm:grid-cols-3 gap-10 justify-items-center">
            {prizes.map((prize, i) => (
              <PrizeItem key={prize.id} prize={prize} index={i} />
            ))}
          </div>
        </div>
        <p className='text-center mt-24 text-sm'>and way way waayy more...</p>
        <Link
          href="/prizes"
          className="block text-center mt-5 font-mono font-bold text-lg text-on-background hover:text-primary-container transition-colors"
        >
          SEE FULL DOSSIER →
        </Link>
      </div>
    </TerminalPane>
  )
}
