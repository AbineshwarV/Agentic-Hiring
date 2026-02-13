import { useEffect, useState } from "react"
import { Briefcase } from "lucide-react"

const API_URL = "https://agentic-v2-0.onrender.com/candidate/master/all"

export default function AppliedJobsSummary() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAppliedJobs() {
      try {
        const res = await fetch(API_URL)
        const data = await res.json()

        // 👇 directly take total_candidates
        setCount(data.total_candidates ?? 0)
      } catch (err) {
        console.error("Failed to fetch applied jobs:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAppliedJobs()
  }, [])

  return (
    <div className="flex items-center justify-between rounded-xl border bg-background px-5 py-4">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </div>

        <p className="text-sm font-medium text-foreground">
          Jobs You Have Applied
        </p>
      </div>

      {/* Right */}
      <p className="text-sm font-semibold text-foreground">
        {loading ? "…" : `${count} Jobs applied`}
      </p>
    </div>
  )
}
