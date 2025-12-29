import { Badge } from "@/components/ui/shadcn/badge"

type Status = "active" | "blocked" | "closed"

export function JobHeader({
  title,
  company,
  status,
}: {
  title: string
  company: string
  status: Status
}) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-muted-foreground">{company}</p>

      <Badge
        variant={
          status === "active"
            ? "success"
            : status === "blocked"
            ? "destructive"
            : "secondary"
        }
        className="capitalize mt-1"
      >
        {status}
      </Badge>
    </div>
  )
}
