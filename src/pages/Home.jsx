import { useNavigate } from "react-router-dom"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">
          Agentic Hiring Platform
        </h1>
        <p className="text-gray-500 mb-6">
          Choose your dashboard
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/candidate/dashboard")}
            className="w-full py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Candidate Dashboard
          </button>

          <button
            onClick={() => navigate("/recruiter/dashboard")}
            className="w-full py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
          >
            Recruiter Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
