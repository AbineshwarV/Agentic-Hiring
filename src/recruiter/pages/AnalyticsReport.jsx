import { Download, BarChart3, FileText, Eye } from "lucide-react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function AnalyticsReport() {
  // 🔽 Download handler (Candidate Ranking)
  const downloadRankingReport = async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/recruiter/download-ranking-report`
      )

      if (!res.ok) {
        throw new Error("Failed to download")
      }

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)

      const a = document.createElement("a")
      a.href = url
      a.download = "candidate-ranking-report.pdf"
      document.body.appendChild(a)
      a.click()

      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      alert("Failed to download ranking report")
    }
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">

      {/* ===== Candidate Ranking ===== */}
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-[linear-gradient(135deg,rgba(99,102,241,0.08),rgba(255,255,255,0.98))] px-8 py-7 text-center transition hover:shadow-sm">

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-200">
          <BarChart3 className="h-5 w-5 text-indigo-600" />
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-slate-900">
          Candidate Ranking
        </h2>

        {/* Helper */}
        <p className="mt-1 text-xs text-slate-600">
          Compare candidates by overall performance
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-indigo-700">
            <Eye className="h-4 w-4" />
            View
          </button>

          {/* 🔥 REAL DOWNLOAD */}
          <button
            onClick={downloadRankingReport}
            className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-indigo-500/70" />
      </div>

      {/* ===== Analysis Output ===== */}
     <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-[linear-gradient(135deg,rgba(16,185,129,0.07),rgba(255,255,255,0.98))] px-8 py-7 text-center transition hover:shadow-sm">

        {/* Icon */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-200">
          <FileText className="h-5 w-5 text-emerald-600" />
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-slate-900">
          Analysis Output
        </h2>

        {/* Helper */}
        <p className="mt-1 text-xs text-slate-600">
          Review AI reasoning and score breakdown
        </p>

        {/* Actions (UI only for now) */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-emerald-700">
            <Eye className="h-4 w-4" />
            View
          </button>

          <button className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
            <Download className="h-4 w-4" />
            Download
          </button>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 h-1 w-full bg-emerald-500/70" />
      </div>

    </div>
  )
}
