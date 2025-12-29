import { Badge } from "@/components/ui/shadcn/badge"

export function StatusBadge({ status }: { status: "active" | "blocked" }) {
  return (
    <Badge
      variant={status === "active" ? "success" : "destructive"}
      className="capitalize"
    >
      {status}
    </Badge>
  )
}