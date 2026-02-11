const jobs = [
  {
    company: "Apple",
    role: "Central Paradigm Engineer",
    salary: "$2500-$3200",
    date: "16 Mar 2025",
    type: "Virtual",
    status: "Pending",
  },
  {
    company: "Google",
    role: "Dynamic Directives Rep",
    salary: "$2500-$3200",
    date: "16 Mar 2025",
    type: "In Person",
    status: "Shortlisted",
  },
];

const statusStyle = {
  Pending: "bg-yellow-100 text-yellow-700",
  Shortlisted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

export default function JobsTable() {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b text-gray-500">
          <tr>
            <th className="p-4 text-left">Company</th>
            <th className="p-4 text-left">Job Title</th>
            <th className="p-4">Salary</th>
            <th className="p-4">Interview</th>
            <th className="p-4">Stage</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="p-4 font-medium">{job.company}</td>
              <td className="p-4">{job.role}</td>
              <td className="p-4 text-center">{job.salary}</td>
              <td className="p-4 text-center">{job.type}</td>
              <td className="p-4 text-center">
                <span className={`px-3 py-1 rounded-full text-xs ${statusStyle[job.status]}`}>
                  {job.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
