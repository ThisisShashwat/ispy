import Link from 'next/link'
import { requireSession } from '../../../lib/auth'
import SiteHeader from '../../../components/SiteHeader'
import Footer from '../../../components/Footer'
import { Heading } from '../../../components/design/Section'
import { WorksheetGrid, DimensionRule } from '../../../components/design/Worksheet'

export default async function SubmissionSuccessPage() {
  await requireSession()

  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />

      <main className="relative border-t border-ink/15 px-5 py-24 sm:px-8">
        <WorksheetGrid dense={false} />
        <div className="relative mx-auto max-w-xl">
          <DimensionRule label="TRANSMISSION CONFIRMED" />
          <Heading as="h1">Submission received</Heading>
          <p className="mt-6 font-data text-[12px] leading-[1.8] text-ink/70">
            Your project has been logged and your prize request is on file. We'll be in touch
            about fulfillment. No further action needed from you right now.
          </p>
          <Link
            href="/dashboard"
            className="mt-10 inline-block bg-ink px-7 py-3.5 font-data text-[11px] font-bold uppercase tracking-[0.12em] text-plate transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Submit another project
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}
