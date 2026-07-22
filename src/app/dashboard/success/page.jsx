import Link from 'next/link'
import { requireSession } from '../../../lib/auth'

export default async function SubmissionSuccessPage() {
  await requireSession()

  return (
    <main className="min-h-screen px-6 py-24 flex items-center justify-center text-center">
      <div className="max-w-lg">
        <p className="font-mono text-primary-container tracking-[0.3em] text-sm mb-4">
          TRANSMISSION CONFIRMED
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-on-background mb-6 text-glow">
          Submission received
        </h1>
        <p className="text-on-surface-variant text-lg mb-10">
          Your project has been logged and your prize request is on file. We'll be in touch
          about fulfillment — no further action needed from you right now.
        </p>
        <Link
          href="/dashboard"
          className="font-mono uppercase tracking-widest border border-primary-container text-primary-container px-8 py-4 hover:bg-primary-container hover:text-on-primary-container transition-colors inline-block"
        >
          Submit another project
        </Link>
      </div>
    </main>
  )
}
