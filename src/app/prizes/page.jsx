import Link from 'next/link'
import { prizeTiers } from '../../data/prizeTiers'
import { cutouts } from '../../data/cutouts'
import SiteHeader from '../../components/SiteHeader'
import Footer from '../../components/Footer'
import PhotoCell from '../../components/design/PhotoCell'
import { Heading } from '../../components/design/Section'
import { WorksheetGrid, DimensionRule } from '../../components/design/Worksheet'

function TierItem({ item, hours }) {
  return (
    <div className="flex flex-col">
      <PhotoCell src={cutouts[item.id] ?? item.image} alt={item.name} hours={hours} />
      <p className="mt-4 font-data text-[11px] font-bold uppercase tracking-[0.1em] text-ink">
        {item.name}
      </p>
      <p className="mt-1.5 font-data text-[11px] leading-[1.7] text-ink/65">{item.desc}</p>
    </div>
  )
}

function TierColumn({ tier }) {
  return (
    <div className="bg-plate">
      <div className="border-b border-ink/15 px-4 py-3 text-center">
        <p className="font-data text-2xl font-bold tabular-nums text-ink">{tier.hours}</p>
        <p className="font-data text-[9px] uppercase tracking-[0.18em] text-signal">
          Hours · {tier.codename}
        </p>
      </div>
      <div className="flex flex-col gap-8 p-5">
        {tier.items.map((item) => (
          <TierItem key={item.id} item={item} hours={tier.hours} />
        ))}
      </div>
    </div>
  )
}

export default function PrizesPage() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />

      <main className="relative border-t border-ink/15 px-5 py-16 sm:px-8 sm:py-24">
        <WorksheetGrid dense={false} />
        <div className="relative mx-auto max-w-[1500px]">
          <DimensionRule label="CASE FILE 003: All Prizes Below" />
          <Heading as="h1">The Reward Ledger</Heading>
          <p className="mt-5 max-w-2xl font-data text-[12px] leading-[1.8] text-ink/70">
            Log build hours, ship the work, redeem whatever you want below
          </p>
          <p className="mt-6 max-w-2xl border border-ink/15 px-4 py-3 font-data text-[11px] leading-[1.75] text-ink/65">
            HOW THIS WORKS: hours are logged externally as you ship. Once your
            logged hours meet a tier threshold, you can pick a prize from anything in that tier (like a shop)!
          </p>

          <div className="mt-12 grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-5">
            {prizeTiers.map((tier) => (
              <TierColumn key={tier.hours} tier={tier} />
            ))}
          </div>

          <div className="mx-auto my-12 flex flex-col gap-1 border border-ink/15 bg-plate p-5 text-center">
            <p className="font-display text-xl font-extrabold text-ink">Want to add something?</p>
            <p className="font-data text-[11px] leading-[1.7] text-ink/65">
              just head over to{' '}
              <a className="link" href="https://hackclub.enterprise.slack.com/docs/T0266FRGM/F0BKLLXLZF0">#ispy</a>{' '}
              and type your suggestion
            </p>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/"
              className="inline-block border border-ink px-7 py-3.5 font-data text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-plate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              ← BACK TO HOMEPAGE
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
