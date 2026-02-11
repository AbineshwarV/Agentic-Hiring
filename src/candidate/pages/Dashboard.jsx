import CandidateWelcomeBanner from "../components/dashboard/CandidateWelcomeBanner"
import AppliedJobsSummary from "../components/dashboard/AppliedJobsSummary"
import JobsTable from "../components/dashboard/JobsTable"

export default function Dashboard() {
  return (
    <section className="flex flex-col gap-6">
      {/* Welcome banner */}
      <CandidateWelcomeBanner />

      {/* Applied jobs summary (image-style card) */}
      <AppliedJobsSummary count={26} />

      {/* Recent applications table */}
      <div className="rounded-xl border bg-background p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            Recent Applications
          </h3>
          <span className="text-xs text-muted-foreground">
            Showing latest results
          </span>
        </div>

        <JobsTable />
      </div>
    </section>
  )
}
