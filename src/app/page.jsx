import Marquee from '../components/Marquee'
import Hero from '../components/sections/Hero'
import Briefing from '../components/sections/Briefing'
import Arsenal from '../components/sections/Arsenal'
import Prizes from '../components/sections/Prizes'
import HowItWorks from '../components/sections/HowItWorks'
import CtaFooter from '../components/sections/CtaFooter'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee />
      <Briefing />
      <Arsenal />
      <Prizes />
      <HowItWorks />
      <CtaFooter />
    </main>
  )
}
