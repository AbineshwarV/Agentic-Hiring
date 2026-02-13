import ScoreMeter from "./ScoreMeter"

export default function CandidateDetailModal({ candidate, onClose }) {
  if (!candidate) return null

  const scores = candidate.scores || {}

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center px-2 sm:px-4">
      
      {/* Modal */}
      <div
        className="
          relative w-full max-w-3xl
          rounded-t-2xl sm:rounded-2xl
          bg-white shadow-xl
          border border-slate-300
          max-h-[90vh] overflow-y-auto
          p-4 sm:p-6
        "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="
            absolute right-3 top-3
            flex h-8 w-8 items-center justify-center
            rounded-full bg-slate-200
            text-gray text-sm
            hover:bg-slate-300
            transition
          "
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-lg sm:text-xl font-semibold mb-4">
          Candidate Details
        </h2>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm mb-6">
          <div><b>Name:</b> {candidate.full_name}</div>
          <div className="truncate"><b>Email:</b> {candidate.email}</div>
          <div><b>Mobile:</b> {candidate.mobile}</div>
          <div className="truncate"><b>LinkedIn:</b> {candidate.linkedin || "-"}</div>
          <div className="truncate"><b>GitHub:</b> {candidate.github || "-"}</div>
        </div>

        {/* Resume Analysis */}
        <h3 className="text-sm font-semibold mb-4 text-muted-foreground">
          Resume Analysis
        </h3>

        {/* ✅ REAL SCORES FROM API */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          <ScoreMeter
            label="Role Fit"
            value={scores.role_fit_score || 0}
          />

          <ScoreMeter
            label="Domain Competency"
            value={scores.domain_competency_score || 0}
          />

          <ScoreMeter
            label="Experience Match"
            value={scores.experience_level_compatibility || 0}
          />

          <ScoreMeter
            label="Composite Score"
            value={scores.composite_score || 0}
          />
        </div>
      </div>
    </div>
  )
}
