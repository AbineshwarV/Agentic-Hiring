import { useEffect, useState } from "react";

/* ================= ENV ================= */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const statusStyle = {
  Pending: "bg-yellow-100 text-yellow-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function JobsTable() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/candidate/master/all`)
      .then((res) => res.json())
      .then((data) => {
        const flattenedJobs =
          data?.candidates?.flatMap((candidate) =>
            candidate.applications.map((app) => ({
              company: app.company_details.company_name,
              role: app.job_details.role,
              salary: app.job_details.salary,
              employmentType: app.job_details.employment_type,
              status: app.decision.status,
            }))
          ) || [];

        setJobs(flattenedJobs);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-400">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* ✅ Responsive wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Job Title</th>
              <th className="p-4 text-center">Salary</th>
              <th className="p-4 text-center">Employment Type</th>
              <th className="p-4 text-center">Stage</th>
            </tr>
          </thead>

          <tbody>
            {jobs.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-400">
                  No applications found
                </td>
              </tr>
            ) : (
              jobs.map((job, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="p-4 font-medium">{job.company}</td>
                  <td className="p-4">{job.role}</td>
                  <td className="p-4 text-center">{job.salary}</td>
                  <td className="p-4 text-center">
                    {job.employmentType || "—"}
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        statusStyle[job.status] ||
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
