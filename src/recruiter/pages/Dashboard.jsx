import { useEffect, useState } from "react"
import DashboardStats from "../components/dashboard/DashboardStats"
import DashboardTable from "../components/dashboard/DashboardTable"
import CandidateDetailModal from "../components/dashboard/CandidateDetailModal"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, shortlisted: 0, rejected: 0 })
  const [candidates, setCandidates] = useState([])
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)

        const res = await fetch(
          `${API_BASE_URL}/api/candidates_with_analysis`
        )
        const data = await res.json()

        const normalized = data.map((c) => {
          const ai = c.ai_response?.candidates?.[0]
          const summary = c.ai_response?.summary || {}

          return {
            id: c.id,
            full_name: c.full_name,
            email: c.email,
            mobile: c.mobile,
            linkedin: c.linkedin,
            github: c.github,

            job_description:
              c.ai_response?.job_description?.replace(".pdf", "") || "-",

            tier: ai?.tier || "N/A",
            action: ai?.action || "PENDING",
            scores: ai?.scores || {},

            score: ai?.scores?.composite_score
              ? Math.round(ai.scores.composite_score * 100)
              : null,

            summary,
          }
        })

        setStats({
          total: normalized.length,
          shortlisted: normalized.filter(
            (c) => c.summary.interview > 0
          ).length,
          rejected: normalized.filter(
            (c) => c.summary.reject > 0
          ).length,
        })

        setCandidates(
          normalized.sort((a, b) => (b.score || 0) - (a.score || 0))
        )
      } catch (err) {
        console.error("Dashboard fetch failed:", err)
      } finally {
        setLoading(false) 
      }
    }

    fetchData()
  }, [])

  /* ---------- PAGE LOADING ---------- */
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
