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

/* ---------- Score Pill ---------- */
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

      {/* Card Header */}
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-slate-900">
          Candidates
        </h2>
      </div>

      {/* 🔒 Card-only horizontal scroll */}
      <div className="overflow-x-auto pb-2">
        <Table className="min-w-[1100px]">

          {/* ===== TABLE HEADER ===== */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[70px] pl-6 font-semibold">
                Rank
              </TableHead>
              <TableHead className="w-[180px] font-semibold">
                Candidate
              </TableHead>
              <TableHead className="w-[260px] font-semibold">
                Job Description
              </TableHead>
              <TableHead className="w-[140px] font-semibold">
                Tier
              </TableHead>
              <TableHead className="w-[220px] font-semibold">
                Status
              </TableHead>
              <TableHead className="w-[180px] font-semibold">
                Score
              </TableHead>
              <TableHead className="w-[90px] pr-6 text-right font-semibold">
                Details
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* ===== TABLE BODY ===== */}
          <TableBody>
            {candidates.map((c, index) => (
              <TableRow
                key={c.id}
                className="hover:bg-muted/40 transition"
              >
                {/* Rank */}
                <TableCell className="pl-6 font-semibold">
                  #{index + 1}
                </TableCell>

                {/* Candidate */}
                <TableCell className="font-medium">
                  {c.full_name}
                </TableCell>

                {/* Job */}
                <TableCell className="truncate">
                  {c.job_description}
                </TableCell>

                {/* Tier */}
                <TableCell>
                  <Badge
                    type={
                      c.tier === "Excellent"
                        ? "success"
                        : c.tier === "Good"
                        ? "warning"
                        : "danger"
                    }
                    label={c.tier}
                  />
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    type={
                      c.action.includes("REJECT")
                        ? "danger"
                        : c.action.includes("INTERVIEW")
                        ? "success"
                        : "warning"
                    }
                    label={c.action}
                  />
                </TableCell>

                {/* Score */}
                <TableCell>
                  <ScorePill score={c.score} />
                </TableCell>

                {/* Details */}
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
