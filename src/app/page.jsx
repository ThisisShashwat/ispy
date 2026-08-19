import SiteHeader from '../components/SiteHeader'
import Footer from '../components/Footer'
import CursorTracker from '../components/design/CursorTracker'
import { WorksheetGrid, RegistrationMarks } from '../components/design/Worksheet'
import { Eyebrow, Section } from '../components/design/Section'
import GearPile from '../components/design/GearPile'
import Shop from '../components/sections/Shop'
import { COPY, FAQ, IDEAS, ITEM_COUNT, MAX_HOURS, MIN_HOURS, STEPS } from '../data/copy'

export default function Home() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />

      <section id="top" className="relative overflow-hidden">
        <WorksheetGrid />
        <RegistrationMarks />
        <CursorTracker />

        <div className="relative mx-auto grid max-w-[1500px] items-center gap-10 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] lg:gap-4 lg:pb-24 lg:pt-20">
          <div className="lg:pr-6">
            <Eyebrow>A Hack Club program · free · ages 13 to 18</Eyebrow>

            <h1
              className="mt-6 font-display font-extrabold text-ink"
              style={{
                fontSize: 'clamp(2.4rem,5.4vw,5.2rem)',
                fontVariationSettings: '"BLED" 14, "SCAN" 0',
                lineHeight: 0.9,
                letterSpacing: '-0.01em',
                textIndent: '-0.055em',
              }}
            >
              <span className="block">{COPY.headline[0]}</span>
              <span className="block text-ink/45">{COPY.headline[1]}</span>
            </h1>

            <p className="mt-7 max-w-md font-data text-[12px] leading-[1.75] text-ink/75">
              {COPY.sub}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={COPY.ctaHref}
                className="bg-ink px-7 py-3.5 font-data text-[11px] font-bold uppercase tracking-[0.12em] text-plate transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {COPY.cta}
              </a>
              <a
                href="#shop"
                className="border border-ink px-7 py-3.5 font-data text-[11px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:bg-ink hover:text-plate focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                See the shop
              </a>
            </div>

            <p className="mt-7 max-w-sm font-data text-[11px] leading-[1.7] text-ink/55">
              {COPY.fine}
            </p>
          </div>

          <div className="relative lg:-mr-24 xl:-mr-40">
            <GearPile />
          </div>
        </div>
      </section>

      <Section
        id="build"
        eyebrow="What to build"
        heading="What can I build?"
        intro="Anything that could watch, listen to, or track something. Here are four to steal."
        tone="plate"
      >
        <ul className="grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {IDEAS.map((idea) => (
            <li key={idea.name} className="bg-plate p-6">
              <h3 className="font-display text-lg font-extrabold text-ink">{idea.name}</h3>
              <p className="mt-2.5 font-data text-[11px] leading-[1.7] text-ink/65">
                {idea.body}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="how" eyebrow="The process" heading="How it works">
        <ol className="grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2">
          {STEPS.map((step) => (
            <li key={step.n} className="bg-ground p-7">
              <div className="flex items-baseline gap-3">
                <span className="font-data text-[13px] font-bold tabular-nums text-signal">
                  {step.n}
                </span>
                <h3 className="font-display text-xl font-extrabold text-ink">{step.title}</h3>
              </div>
              <p className="mt-3 font-data text-[11px] leading-[1.75] text-ink/65">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        id="shop"
        eyebrow={`${ITEM_COUNT} rewards · ${MIN_HOURS} to ${MAX_HOURS} hours`}
        heading="The shop"
        intro="Every reward has a flat price in hours. Log 12 hours, you’ve got 12 to spend. Hours are money here, not rank."
        tone="plate"
      >
        <Shop />
      </Section>

      <Section id="faq" eyebrow="Questions" heading="FAQ">
        <div className="max-w-3xl border-t border-ink/15">
          {FAQ.map((item) => (
            <details key={item.q} className="group border-b border-ink/15">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-4 font-display text-base font-bold marker:content-none hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:text-lg">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 font-data text-signal transition-transform group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="max-w-2xl pb-5 font-data text-[11px] leading-[1.8] text-ink/65">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <section className="border-t border-ink/15 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-[1500px]">
          <h2
            className="max-w-3xl font-display font-extrabold text-ink"
            style={{
              fontSize: 'clamp(2rem,4.6vw,4rem)',
              lineHeight: 0.94,
              letterSpacing: '-0.01em',
            }}
          >
            Pick something creepy.
            <br />
            <span className="text-ink/45">Start the clock.</span>
          </h2>
          <a
            href={COPY.ctaHref}
            className="mt-10 inline-block bg-ink px-9 py-4 font-data text-[12px] font-bold uppercase tracking-[0.12em] text-plate transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {COPY.cta}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
