import { Routes, Route, Navigate } from "react-router-dom"

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
      {/* ================= CANDIDATE ================= */}
      <Route path="/candidate" element={<CandidateLayout />}>
        <Route index element={<CandidateDashboard />} />
        <Route path="dashboard" element={<CandidateDashboard />} />
        <Route path="jobs" element={<CandidateJobs />} />
      </Route>

      {/* ================= RECRUITER ================= */}
      <Route path="/recruiter" element={<RecruiterLayout />}>
        <Route index element={<RecruiterDashboard />} />
        <Route path="dashboard" element={<RecruiterDashboard />} />
        <Route path="jobs" element={<RecruiterJobs />} />
        <Route path="candidates" element={<>Candidates</>} />
        <Route path="interviews" element={<>Interviews</>} />
        <Route path="analytics" element={<AnalyticsReport />} />
        <Route path="fraud-detection" element={<FraudDetection />} />
      </Route>

      {/* ================= FALLBACK ================= */}
      <Route
        path="*"
        element={<Navigate to="/candidate/dashboard" replace />}
      />
    </Routes>
  )
}

export default App
