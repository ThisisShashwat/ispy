import { requireSession } from '../../lib/auth'
import { getIdentity } from '../../lib/hackclub'
import { getHackatimeMe, getHackatimeProjects } from '../../lib/hackatime'
import DashboardClient from '../../components/dashboard/DashboardClient'

export default async function DashboardPage() {
  const session = await requireSession()

  const [identity, hackatimeMe, projects] = await Promise.all([
    getIdentity(session.access_token),
    getHackatimeMe(session.hackatime_access_token),
    getHackatimeProjects(session.hackatime_access_token),
  ])

  // Birthday and address aren't in scope for a Community-tier OAuth app
  // (see lib/hackclub.js) — collected manually in the form instead.
  const profile = {
    firstName: identity?.first_name ?? '',
    lastName: identity?.last_name ?? '',
    email: identity?.primary_email ?? '',
    githubUsername: hackatimeMe?.github_username ?? '',
  }

  return (
    <main className="min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <p className="font-mono text-primary-container tracking-[0.3em] text-sm mb-4">
          CASE FILE — ELIGIBILITY
        </p>
        <h2
          data-text="What Counts"
          className="glitch-title text-2xl sm:text-3xl font-bold text-on-background mb-6"
        >
          What Counts
        </h2>
        <ul className="text-on-surface-variant leading-relaxed mb-16 list-disc pl-5 space-y-1">
          <li>Something that could in theory be used to spy on someone. Very very broad theme ik</li>
          <li>Shipped publicly (repo, build, or hardware demo)</li>
          <li>Hardware projects: some exceptions on &ldquo;fully working&rdquo;</li>
        </ul>

        <p className="font-mono text-primary-container tracking-[0.3em] text-sm mb-4">
          CASE FILE — AGENT DASHBOARD
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-on-background mb-10">
          Submit a project
        </h1>
        <DashboardClient profile={profile} projects={projects} />
      </div>
    </main>
  )
}
