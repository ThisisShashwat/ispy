import { requireSession } from '../../lib/auth'
import { getIdentity } from '../../lib/hackclub'
import { getHackatimeMe, getHackatimeProjects } from '../../lib/hackatime'
import DashboardClient from '../../components/dashboard/DashboardClient'
import SiteHeader from '../../components/SiteHeader'
import Footer from '../../components/Footer'
import { Heading } from '../../components/design/Section'
import { WorksheetGrid, DimensionRule } from '../../components/design/Worksheet'

export default async function DashboardPage() {
  const session = await requireSession()

  const [identity, hackatimeMe, projects] = await Promise.all([
    getIdentity(session.access_token),
    getHackatimeMe(session.hackatime_access_token),
    getHackatimeProjects(session.hackatime_access_token),
  ])

  const profile = {
    firstName: identity?.first_name ?? '',
    lastName: identity?.last_name ?? '',
    email: identity?.primary_email ?? '',
    githubUsername: hackatimeMe?.github_username ?? '',
  }

  return (
    <div className="min-h-screen bg-ground text-ink">
      <SiteHeader />

      <main className="relative border-t border-ink/15 px-5 py-16 sm:px-8 sm:py-24">
        <WorksheetGrid dense={false} />
        <div className="relative mx-auto max-w-[1500px]">
          <DimensionRule label="CASE FILE: ELIGIBILITY" />
          <Heading>What Counts</Heading>
          <ul className="mb-16 mt-6 max-w-2xl list-disc space-y-1 pl-5 font-data text-[11px] leading-[1.8] text-ink/65">
            <li>Something that could in theory be used to spy on someone. Very very broad theme ik</li>
            <li>Shipped publicly (repo, build, or hardware demo)</li>
            <li>Hardware projects: some exceptions on &ldquo;fully working&rdquo;</li>
          </ul>

          <DimensionRule label="CASE FILE: AGENT DASHBOARD" />
          <Heading as="h1">Submit a project</Heading>
          <div className="mt-10">
            <DashboardClient profile={profile} projects={projects} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
