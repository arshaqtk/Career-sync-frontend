import { Badge } from "@/components/ui/shadcn/badge";
import type { InterviewStatus } from "../../../types/interview.type";

const styles: Record<InterviewStatus, string> = {
  Scheduled: "bg-blue-100 text-blue-700",
  Rescheduled: "bg-indigo-100 text-indigo-700",
  // InProgress: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
  Selected: "bg-emerald-100 text-emerald-700",
  Rejected: "bg-rose-100 text-rose-700",
  Cancelled: "bg-red-100 text-red-700",
};

export function InterviewStatusBadge({
  status,
}: {
  status: InterviewStatus;
}) {
  return <Badge className={styles[status]}>{status}</Badge>;
}
