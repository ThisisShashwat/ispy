import { COPY } from '../data/copy'

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hair bg-ground/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1500px] items-center gap-6 px-5 py-3 sm:px-8">
        <a
          href="/"
          className="font-display text-2xl uppercase leading-none text-ink"
          style={{ letterSpacing: '0.03em', fontVariationSettings: '"BLED" 26, "SCAN" 0' }}
        >
          {COPY.wordmark}
        </a>

        <nav className="ml-auto hidden items-center gap-6 md:flex">
          {COPY.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-data text-[10px] uppercase tracking-[0.12em] text-ink/55 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            >
              {item.label}
            </a>
          ))}
          <span className="border border-hair px-2.5 py-1 font-data text-[10px] uppercase tracking-[0.12em] text-ink/60">
            Cart <span className="text-signal">0H</span>
          </span>
        </nav>

        <a
          href={COPY.ctaHref}
          className="ml-auto bg-ink px-4 py-2 font-data text-[10px] font-bold uppercase tracking-[0.12em] text-plate transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:ml-0"
        >
          Start
        </a>
      </div>
    </header>
  )
}
