'use client'

import Link from 'next/link'
import { prizeTiers } from '../../data/prizeTiers'
import DossierPhoto from '../../components/DossierPhoto'
import TerminalPane from '../../components/TerminalPane'
import { useRevealOnScroll } from '../../hooks/useRevealOnScroll'

function TierItem({ item }) {
  return (
    <div className="flex flex-col items-center">
      <DossierPhoto src={item.image} alt={item.name} width="w-full" />
      <p className="mt-4 font-mono uppercase tracking-widest text-on-background font-bold text-sm text-center">
        {item.name}
      </p>
      <p className="mt-1 text-on-surface-variant text-sm text-center">{item.desc}</p>
    </div>
  )
}

function TierColumn({ tier, index }) {
  const [ref, visible] = useRevealOnScroll()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 150}ms` : '0ms' }}
      className={`border border-outline bg-surface-container-low transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      <div className="border-b border-dashed border-outline-variant px-4 py-3 text-center">
        <p className="font-mono text-2xl font-bold text-on-background">{tier.hours}</p>
        <p className="font-mono text-[10px] tracking-widest text-primary-container uppercase">
          Hours — {tier.codename}
        </p>
      </div>
      <div className="p-4 flex flex-col gap-8">
        {tier.items.map((item) => (
          <TierItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default function PrizesPage() {
  return (
    <main>
      <TerminalPane path="./reward_shop.py --tiers --all">
        <div className="px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="font-mono text-primary-container tracking-[0.3em] text-sm mb-4">
                CASE FILE 003 — All Prizes Below
              </p>
              <h1
                data-text="The Reward Ledger"
                className="glitch-title text-3xl sm:text-4xl font-bold text-on-background mb-3"
              >
                The Reward Ledger
              </h1>
              <p className="text-on-surface-variant text-lg max-w-2xl mx-auto mb-6">
                Log build hours, ship the work, redeem whatever you want below
              </p>
              <p className="font-mono text-xs text-on-surface-variant max-w-xl mx-auto border border-outline-variant border-dashed px-4 py-3">
                HOW THIS WORKS: hours are logged externally as you ship. Once your
                logged hours meet a tier threshold, you can pick a prize from anything in that tier (like a shop)!
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 items-start">
              {prizeTiers.map((tier, i) => (
                <TierColumn key={tier.hours} tier={tier} index={i} />
              ))}
            </div>

            <div className="text-center mt-16">
              <Link
                href="/"
                className="font-mono text-sm text-primary-container hover:underline tracking-wide"
              >
                ← BACK TO HOMEPAGE
              </Link>
            </div>
          </div>
        </div>
      </TerminalPane>
    </main>
  )
}
