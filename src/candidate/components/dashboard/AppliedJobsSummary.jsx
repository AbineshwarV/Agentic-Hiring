import { useEffect, useState } from "react"
import { Briefcase } from "lucide-react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function AppliedJobsSummary() {
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAppliedJobs() {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/candidates_with_analysis`
        )
        const data = await res.json()

        const uniqueIds = new Set(data.map(item => item.id))
        setCount(uniqueIds.size)
      } catch (err) {
        console.error(err)
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

      {/* Right (BOLD) */}
      <p className="text-sm font-semibold text-foreground">
        {loading ? "…" : `${count} Jobs applied`}
      </p>
    </div>
  )
}
