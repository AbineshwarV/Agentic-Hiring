import { Eye } from "lucide-react"
import Badge from "./Badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function ScorePill({ score }) {
  if (score === null || score === undefined) {
    return <span className="text-muted-foreground">-</span>
  }

  const color =
    score >= 75
      ? "bg-green-500"
      : score >= 50
      ? "bg-yellow-500"
      : "bg-red-500"

  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-24 rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`h-full ${color}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="text-xs font-semibold w-10 text-right">
        {score}%
      </span>
    </div>
  )
}

export default function DashboardTable({ candidates, onView }) {
  return (
    <div className="rounded-xl border bg-background shadow-sm overflow-hidden">

      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-slate-900">
          Candidates
        </h2>
      </div>

      <div className="overflow-x-auto pb-2">
        <Table className="min-w-[1200px]">

          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[70px]">Rank</TableHead>
              <TableHead className="w-[180px]">Candidate</TableHead>
              <TableHead className="w-[200px]">Job Role</TableHead>
              <TableHead className="w-[160px]">Company</TableHead>
              <TableHead className="w-[160px]">Status</TableHead>
              <TableHead className="w-[180px]">Score</TableHead>
              <TableHead className="pr-6 w-[90px] text-right">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {candidates.map((c, index) => (
              <TableRow key={c.id} className="hover:bg-muted/40">
                <TableCell className="pl-6 font-semibold">
                  #{index + 1}
                </TableCell>

                <TableCell className="font-medium">
                  {c.full_name}
                </TableCell>

                <TableCell>{c.job_description}</TableCell>

                {/* ✅ COMPANY */}
                <TableCell className="font-medium">
                  {c.company_name}
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    type={
                      c.action === "Selected"
                        ? "success"
                        : c.action === "Rejected"
                        ? "danger"
                        : "warning"
                    }
                    label={c.action}
                  />
                </TableCell>

                <TableCell>
                  <ScorePill score={c.score} />
                </TableCell>

                <TableCell className="pr-6 text-right">
                  <button
                    onClick={() => onView(c)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}

            {candidates.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-10 text-center text-muted-foreground"
                >
                  No candidates found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
