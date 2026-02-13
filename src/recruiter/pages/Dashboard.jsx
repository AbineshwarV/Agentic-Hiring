import { useEffect, useState } from "react"
import DashboardStats from "../components/dashboard/DashboardStats"
import DashboardTable from "../components/dashboard/DashboardTable"
import CandidateDetailModal from "../components/dashboard/CandidateDetailModal"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    shortlisted: 0,
    rejected: 0,
  })

  const [candidates, setCandidates] = useState([])
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true)

        const res = await fetch(
          `${API_BASE_URL}/candidate/master/all`
        )
        if (!res.ok) throw new Error("API failed")

        const data = await res.json()

        /* ---------- DASHBOARD STATS ---------- */
        setStats({
          total: data.total_candidates ?? 0,
          shortlisted: data.global_statistics?.total_selected ?? 0,
          rejected: data.global_statistics?.total_rejected ?? 0,
        })

        /* ---------- TABLE DATA ---------- */
        const rows = []

        data.candidates.forEach((c) => {
          c.applications.forEach((app) => {
            rows.push({
              id: app.application_id,

              full_name: c.candidate_profile.name,
              email: c.candidate_profile.email,
              mobile: c.candidate_profile.mobile,
              linkedin: c.candidate_profile.linkedin,
              github: c.candidate_profile.github,

              job_description: app.job_details.role,
              company_name:
                app.company_details?.company_name || "-",

              action: app.decision?.status || "PENDING",

              score: app.scores?.composite_score
                ? Math.round(app.scores.composite_score * 100)
                : null,

              scores: app.scores || {},
            })
          })
        })

        setCandidates(
          rows.sort((a, b) => (b.score || 0) - (a.score || 0))
        )
      } catch (err) {
        console.error("Dashboard fetch failed:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" />
          <p className="text-sm text-muted-foreground">
            Loading recruiter dashboard…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <DashboardStats stats={stats} />

      <DashboardTable
        candidates={candidates}
        onView={setSelectedCandidate}
      />

      {selectedCandidate && (
        <CandidateDetailModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}
    </div>
  )
}
