import Marquee from '../components/Marquee'
import TerminalPane from '../components/TerminalPane'
import CursorTrail from '../components/CursorTrail'
import Hero from '../components/sections/Hero'
import Briefing from '../components/sections/Briefing'
import Arsenal from '../components/sections/Arsenal'
import Prizes from '../components/sections/Prizes'
import HowItWorks from '../components/sections/HowItWorks'
import CtaFooter from '../components/sections/CtaFooter'
import Footer from '../components/Footer'

const DIVIDER = 'border-t border-dashed border-outline-variant'

export default function Home() {
  return (
    <main className="bg-black bg-grid">
      <CursorTrail />
      <div className="max-w-6xl mx-auto px-3 py-8 sm:px-8 sm:py-14 shadow-[0_0_80px_rgba(0,255,65,0.06)]">
        <TerminalPane className="bg-surface">
          <Hero />
          {/* <Marquee /> */}
          <div className={DIVIDER}>
            <Briefing />
          </div>
          <div className={DIVIDER}>
            <Arsenal />
          </div>
          <div className={DIVIDER}>
            <Prizes />
          </div>
          <div className={DIVIDER}>
            <HowItWorks />
          </div>
          <div className={DIVIDER}>
            <CtaFooter />
          </div>
        </TerminalPane>
      </div>
      <Footer />
    </main>
  )
}
