import { useEffect, useState } from "react"
import { SearchX } from "lucide-react"

import JobsHeader from "../components/jobs/JobsHeader"
import JobCard from "../components/jobs/JobCard"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState("")
  const [activeFilter, setActiveFilter] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/jobs`)
        const data = await res.json()

        const mappedJobs = data.map(job => ({
          id: job.id,
          company: job.company_name,
          role: job.job_title,
          location: job.location,
          type: job.employment_type,
          salary: job.salary_range,
        }))

        setJobs(mappedJobs)
      } catch (err) {
        console.error("Failed to fetch jobs", err)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  /* 🔍 SEARCH + FILTER (UNCHANGED) */
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.role.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      activeFilter === "All" ||
      job.location.toLowerCase() === activeFilter.toLowerCase()

    return matchesSearch && matchesFilter
  })

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground">
        Loading jobs…
      </p>
    )
  }

  return (
    <section className="space-y-6">
      <JobsHeader
        search={search}
        setSearch={setSearch}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <div className="grid gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border bg-muted/30 py-16 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
              <SearchX className="h-6 w-6 text-muted-foreground" />
            </div>

            <h3 className="text-sm font-semibold text-foreground">
              No jobs found
            </h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Try adjusting your search or filter to find more opportunities.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
