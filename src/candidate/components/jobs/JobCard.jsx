import { Briefcase, MapPin, Clock } from "lucide-react"
import { useState } from "react"
import ResumeUploadModal from "./ResumeUploadDialog"

export default function JobCard({ job }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="rounded-xl border bg-background p-5 transition hover:shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-foreground">
              {job.role}
            </h3>

            <p className="text-sm text-muted-foreground">
              {job.company}
            </p>

            <div className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {job.location}
              </span>

              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {job.type}
              </span>

              <span className="flex items-center gap-1">
                <Briefcase className="h-3.5 w-3.5" />
                {job.salary}
              </span>
            </div>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Apply
          </button>
        </div>
      </div>

      <ResumeUploadModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  )
}
