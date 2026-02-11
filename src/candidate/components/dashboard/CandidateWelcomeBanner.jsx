import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import heroImg from "@/assets/hero.jpg"

export default function CandidateWelcomeBanner() {
  const navigate = useNavigate()

  return (
    <div
      className="
        relative overflow-hidden rounded-xl border
        bg-gradient-to-r from-slate-50 via-orange-50 to-emerald-50
        p-6 shadow-sm ring-1 ring-black/5
      "
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

        {/* LEFT CONTENT */}
        <div className="max-w-xl">
          <h2 className="text-base font-semibold text-foreground">
            Get discovered by recruiters for real skills
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Our AI matches your skills, projects, and experience with relevant
            jobs — automatically and continuously.
          </p>

          <button
            onClick={() => navigate("/candidate/jobs")}
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            View matched jobs
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* RIGHT HERO IMAGE */}
        <div className="relative hidden md:flex items-center justify-end w-64 lg:w-72">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={heroImg}
              alt="Career opportunities"
              className="h-40 lg:h-44 w-full object-contain"
            />
          </div>
        </div>


      </div>
    </div>
  )
}
