import { useNavigate } from "react-router-dom"
import { User, Briefcase } from "lucide-react"
import LogoIcon from "@/assets/virtu-forge-logo.png"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-100 px-4">
      <div className="max-w-3xl w-full text-center">

        {/* ICON + TEXT INLINE */}
        <div className="flex items-center justify-center gap-3">
          <img
            src={LogoIcon}
            alt="VirtuForge Icon"
            className="h-20 sm:h-24 md:h-28 object-contain"
          />

          <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-none">
            <span className="text-slate-700">Virtu</span>
            <span className="text-orange-500">Forge</span>
          </h1>
        </div>

        {/* Manual underline */}
        <div className="mx-auto mt-4 h-1 w-32 rounded-full bg-orange-500" />

        {/* Tagline */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-xl mx-auto">
          One platform for smart hiring and real talent, at scale.
        </p>

        {/* CTA Buttons with Icons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/candidate/dashboard")}
            className="flex items-center justify-center gap-2 px-10 py-3 rounded-xl bg-orange-500 text-white font-semibold shadow-lg hover:bg-orange-600 transition"
          >
            <User className="h-5 w-5" />
            Continue as Candidate
          </button>

          <button
            onClick={() => navigate("/recruiter/dashboard")}
            className="flex items-center justify-center gap-2 px-10 py-3 rounded-xl border-2 border-orange-500 text-orange-600 font-semibold hover:bg-orange-50 transition"
          >
            <Briefcase className="h-5 w-5" />
            Continue as Recruiter
          </button>
        </div>

        {/* Footer */}
        <p className="mt-14 text-sm text-slate-400">
          © {new Date().getFullYear()} VirtuForge — Built for modern hiring
        </p>
      </div>
    </div>
  )
}
