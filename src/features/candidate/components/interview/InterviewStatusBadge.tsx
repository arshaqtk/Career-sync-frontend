import { Badge } from "@/components/ui/shadcn/badge"
import type { InterviewStatus } from "../../types/interview.types"

const statusStyles: Record<InterviewStatus, string> = {
  Scheduled: "bg-blue-50 text-blue-700 border-blue-200",
  InProgress: "bg-amber-50 text-amber-700 border-amber-200",
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled: "bg-rose-50 text-rose-700 border-rose-200",
  Rescheduled: "bg-indigo-50 text-indigo-700 border-indigo-200",
}

export function InterviewStatusBadge({ status }: { status: InterviewStatus }) {
  return (
    <Badge
      className={`${statusStyles[status]} px-2.5 py-0.5 rounded-md border text-[11px] font-bold uppercase tracking-wider`}
    >
      {status}
    </Badge>
  )
}

