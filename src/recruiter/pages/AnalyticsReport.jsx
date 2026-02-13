import { useEffect, useState } from "react"
import {
  BarChart3,
  Download,
  Radar,
} from "lucide-react"

/* ================= ENV BASE ================= */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/* ================= ENDPOINTS ================= */
const ANALYSIS_REPORT_API =
  `${API_BASE_URL}/analytics/master-report/pdf`

const SKILL_GRAPH_API =
  `${API_BASE_URL}/candidate/master/all`

export default function AnalyticsReport() {
  const downloadAnalysisReport = () => {
    const link = document.createElement("a")
    link.href = ANALYSIS_REPORT_API
    link.download = "analysis-report.pdf"
    link.click()
  }

  return (
    <div className="space-y-10">
      {/* ===== CENTERED ANALYSIS REPORT CARD ===== */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-md rounded-xl border bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(255,255,255,0.98))] px-8 py-7 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-200">
            <BarChart3 className="h-5 w-5 text-indigo-600" />
          </div>

          <h2 className="text-sm font-semibold">
            Analysis Full Report
          </h2>

          <p className="mt-1 text-xs text-slate-600">
            Download complete AI-generated analysis report
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={downloadAnalysisReport}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-xs font-medium text-white hover:bg-indigo-700"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>

          <div className="absolute bottom-0 left-0 h-1 w-full bg-indigo-500/70" />
        </div>
      </div>

      {/* ===== SKILL EVIDENCE GRAPH ===== */}
      <SkillEvidenceGraph />
    </div>
  )
}

/* ===================================================== */
/* ================ SKILL EVIDENCE GRAPH ================ */
/* ===================================================== */

function SkillEvidenceGraph() {
  const [candidates, setCandidates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(SKILL_GRAPH_API)
      .then(res => res.json())
      .then(data => {
        setCandidates(data.candidates || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="rounded-xl border bg-card p-6 text-sm text-muted-foreground">
        Loading skill evidence…
      </div>
    )
  }

  return (
    <div className="rounded-xl border bg-card p-6 space-y-6">
      {/* Header with unique icon */}
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100">
          <Radar className="h-4 w-4 text-orange-600" />
        </div>
        <h2 className="text-lg font-semibold">
          Skill Evidence Graph
        </h2>
      </div>

      <p className="text-sm text-muted-foreground max-w-3xl">
        Skill alignment visualization comparing candidate skills with job
        requirements.
      </p>

      <div className="space-y-8">
        {candidates.map(candidate => {
          const profile = candidate.candidate_profile
          const skillMatch =
            candidate.applications?.[0]?.skill_analysis?.skill_match

          if (!skillMatch) return null

          const matched = skillMatch.matched_skills.length
          const missing = skillMatch.missing_skills.length
          const extra = skillMatch.extra_skills.length
          const total = matched + missing

          return (
            <div
              key={profile.candidate_id}
              className="rounded-lg border p-5 space-y-4"
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {profile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {profile.email}
                  </p>
                </div>

                <span className="text-sm font-semibold">
                  Match {skillMatch.match_percentage}%
                </span>
              </div>

              {/* Stacked Bar */}
              <div className="h-3 w-full rounded-full bg-muted overflow-hidden flex">
                <div
                  className="bg-green-500"
                  style={{ width: `${(matched / total) * 100}%` }}
                />
                <div
                  className="bg-red-500"
                  style={{ width: `${(missing / total) * 100}%` }}
                />
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 text-xs font-medium">
                <Legend color="bg-green-500" label={`Matched (${matched})`} />
                <Legend color="bg-red-500" label={`Missing (${missing})`} />
                <Legend color="bg-purple-500" label={`Extra (${extra})`} />
              </div>

              {/* Extra Skills */}
              {extra > 0 && (
                <div className="pt-2">
                  <p className="mb-2 text-xs font-semibold text-muted-foreground">
                    Bonus Skills
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {skillMatch.extra_skills.map(skill => (
                      <span
                        key={skill}
                        className="rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ---------------- Helper ---------------- */

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-1">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      {label}
    </div>
  )
}
