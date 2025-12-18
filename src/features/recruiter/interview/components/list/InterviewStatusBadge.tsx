import { Badge } from "@/components/ui/shadcn/badge";
import type { InterviewStatus } from "../../types/interview.type";

const styles: Record<InterviewStatus, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Scheduled: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export function InterviewStatusBadge({
  status,
}: {
  status: InterviewStatus;
}) {
  return <Badge className={styles[status]}>{status}</Badge>;
}
