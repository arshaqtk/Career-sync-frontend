import { Badge } from "@/components/ui/shadcn/badge"

type JobStatus = "active" | "blocked" | "closed"

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const map: Record<JobStatus, "success" | "destructive" | "secondary"> = {
    active: "success",
    blocked: "destructive",
    closed: "secondary",
  }

  return (
    <Badge
      variant={map[status]}
      className="capitalize"
    >
      {status}
    </Badge>
  )
}
