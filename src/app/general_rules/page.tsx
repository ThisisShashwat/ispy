import SiteHeader from '../../components/SiteHeader'
import Footer from '../../components/Footer'
import { Heading } from '../../components/design/Section'
import { WorksheetGrid, DimensionRule } from '../../components/design/Worksheet'

export default function Page() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />

      <main className="relative border-t border-ink/15 px-5 py-16 sm:px-8 sm:py-24">
        <WorksheetGrid dense={false} />
        <div className="relative mx-auto max-w-3xl">
          <DimensionRule label="The general grant" />
          <Heading as="h1">Handwritten (no ai here) rules:</Heading>

          <div className="mt-10 flex flex-col gap-5 font-data text-[12px] leading-[1.8] text-ink/70">
            <p>this money would be approved on a per-transaction purpose and is meant to be for instances where you want something that the shop doesn't have in particular, but is perhaps more expensive or slightly different then the one in the shop</p>

            <p>if you decide to use this grant, you are responsible for shipping, customs, or anything else </p>

            <p>if you are looking to fund your hardware project, look at the hardware grant (not the general grant) to get an elevated rate</p>

            <p>example of how the general grant works:</p>

            <p>1) You don't want the Casio Watch shown and you prefer one that costs $50 more.</p>

            <p>2) You first need to earn the casio watch, and then work the difference in upgrade grants</p>

            <p className="bg-ink p-4 text-plate">Note: Upgrade Grants cannot be for totally unrelated items that aren't in the shop.</p>

            <p className="mt-11">now that you've read this, you can finally get to hacking!</p>

            <p className="mt-6">cheers, <br />seba (plastuchino) ;)</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
