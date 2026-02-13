import { Users, CheckCircle, XCircle } from "lucide-react"

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="
      rounded-xl border
      bg-gradient-to-r from-slate-50/60 via-orange-50/40 to-emerald-50/60
      p-6 shadow-sm ring-1 ring-black/5
    ">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-foreground">
            {value}
          </p>
        </div>
        <Icon className="h-7 w-7 text-muted-foreground" />
      </div>
    </div>
  )
}

export default function DashboardStats({ stats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard title="Total Candidates" value={stats.total} icon={Users} />
      <StatCard title="Shortlisted" value={stats.shortlisted} icon={CheckCircle} />
      <StatCard title="Rejected" value={stats.rejected} icon={XCircle} />
    </div>
  )
}
