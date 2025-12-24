import { Badge } from "@/components/ui/shadcn/badge"
import type{ InterviewStatus } from "../../types/interview.types"

const statusColor: Record<InterviewStatus, string> = {
  Scheduled: "bg-blue-100 text-blue-700",
  InProgress: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Rescheduled: "bg-purple-100 text-purple-700",
}

export function InterviewStatusBadge({ status }: { status: InterviewStatus }) {
  return <Badge className={statusColor[status]}>{status}</Badge>
}
