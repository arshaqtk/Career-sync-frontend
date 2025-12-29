import { Badge } from "@/components/ui/shadcn/badge"

type JobStatus = "active" | "blocked" | "closed"

export function JobStatusBadge({ status }: { status: JobStatus }) {
  const map: Record<JobStatus, string> = {
    active: "success",
    blocked: "destructive",
    closed: "secondary",
  }

  return (
    <Badge
      variant={map[status] as any}
      className="capitalize"
    >
      {status}
    </Badge>
  )
}
