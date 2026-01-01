import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card"
import { Badge } from "@/components/ui/shadcn/badge"
import { Skeleton } from "@/components/ui/shadcn/skeleton"

export interface SystemHealthData {
  status: "Stable" | "Warning" | "Critical"
  flaggedJobs: number
  blockedRecruiters: number
  lastIncident?: string
}

interface SystemHealthProps {
  data?: SystemHealthData
  loading?: boolean
}

const DUMMY_HEALTH: SystemHealthData = {
  status: "Stable",
  flaggedJobs: 12,
  blockedRecruiters: 4,
  lastIncident: "No recent incidents",
}

export function SystemHealth({
  data,
  loading,
}: SystemHealthProps) {
  const health = data ?? DUMMY_HEALTH

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Platform Status
          </span>
          <StatusBadge status={health.status} />
        </div>

        {/* Flagged Jobs */}
        <HealthRow
          label="Flagged Jobs"
          value={health.flaggedJobs}
        />

        {/* Blocked Recruiters */}
        <HealthRow
          label="Blocked Recruiters"
          value={health.blockedRecruiters}
        />

        {/* Last Incident */}
        <div className="pt-2 border-t text-sm text-muted-foreground">
          Last Incident:{" "}
          <span className="font-medium text-foreground">
            {health.lastIncident ?? "—"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

/* ---------------- Helper Components ---------------- */

function StatusBadge({
  status,
}: {
  status: SystemHealthData["status"]
}) {
  const variant =
    status === "Stable"
      ? "default"
      : status === "Warning"
      ? "secondary"
      : "destructive"

  return <Badge variant={variant}>{status}</Badge>
}

function HealthRow({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}
