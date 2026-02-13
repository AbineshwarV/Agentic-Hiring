export default function ScoreMeter({ label, value }) {
  const radius = 32
  const circumference = 2 * Math.PI * radius
  const progress = circumference - value * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="80" height="80">
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          stroke="#4f46e5"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="text-sm font-semibold fill-slate-800"
        >
          {Math.round(value * 100)}%
        </text>
      </svg>
      <span className="text-xs text-muted-foreground">
        {label}
      </span>
    </div>
  )
}
