import { Button } from "@/components/ui/shadcn/button"
import { Badge } from "@/components/ui/shadcn/badge"
import { Spinner } from "@/components/ui/shadcn/spinner"
import { Ban, CheckCircle } from "lucide-react"

type Status = "active" | "blocked"

export function RecruiterHeader({
  name,
  status,
  loading,
  onAction,
}: {
  name: string
  status: Status
  loading: boolean
  onAction: (currentStatus: Status) => void
}) {
  const isActive = status === "active"

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left: Name + Status */}
      <div>
        <h1 className="text-2xl font-semibold">{name}</h1>
        <Badge
          variant={isActive ? "success" : "destructive"}
          className="capitalize mt-1"
        >
          {status}
        </Badge>
      </div>

      {/* Right: Action */}
      <Button
        onClick={() => onAction(status)}
        disabled={loading}
        variant={isActive ? "destructive" : "default"}
      >
        {loading ? (
          <Spinner className="mr-2 h-4 w-4" />
        ) : isActive ? (
          <Ban className="mr-2 h-4 w-4" />
        ) : (
          <CheckCircle className="mr-2 h-4 w-4" />
        )}

        {isActive ? "Block Recruiter" : "Unblock Recruiter"}
      </Button>
    </div>
  )
}
