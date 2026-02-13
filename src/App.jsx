import { Routes, Route, Navigate } from "react-router-dom"

// Common
import Home from "./pages/Home"

// Candidate
import CandidateLayout from "./candidate/layout/CandidateLayout"
import CandidateDashboard from "./candidate/pages/Dashboard"
import CandidateJobs from "./candidate/pages/Jobs"

// Recruiter
import RecruiterLayout from "./recruiter/layout/RecruiterLayout"
import RecruiterDashboard from "./recruiter/pages/Dashboard"
import RecruiterJobs from "./recruiter/pages/Jobs"
import AnalyticsReport from "./recruiter/pages/AnalyticsReport"
import FraudDetection from "./recruiter/pages/FraudDetection"

function App() {
  return (
    <Routes>
      {/* ===== HOME ===== */}
      <Route path="/" element={<Home />} />

      {/* ===== CANDIDATE ===== */}
      <Route path="/candidate/dashboard" element={<CandidateLayout />}>
        <Route index element={<CandidateDashboard />} />
        <Route path="jobs" element={<CandidateJobs />} />
      </Route>

      {/* ===== RECRUITER (KEY FIX) ===== */}
      <Route path="/recruiter/dashboard" element={<RecruiterLayout />}>
        <Route index element={<RecruiterDashboard />} />
        <Route path="jobs" element={<RecruiterJobs />} />
        <Route path="analytics" element={<AnalyticsReport />} />
        <Route path="fraud-detection" element={<FraudDetection />} />
      </Route>

      {/* ===== FALLBACK ===== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
