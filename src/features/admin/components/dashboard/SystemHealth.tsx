import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card"
import { Skeleton } from "@/components/ui/shadcn/skeleton"

export interface SystemHealthData {
  status: "Stable" | "Warning" | "Critical"
  pendingCompanies: number
  pausedJobs: number
  applicationsToday: number
}

interface SystemHealthProps {
  data?: SystemHealthData
  loading?: boolean
}

const DUMMY_HEALTH: SystemHealthData = {
  status: "Stable",
  pendingCompanies: 3,
  pausedJobs: 5,
  applicationsToday: 18,
}

import { motion } from "framer-motion"
import { AlertCircle, BriefcaseBusiness, Building2 } from "lucide-react"

export function SystemHealth({
  data,
  loading,
}: SystemHealthProps) {
  const health = data ?? DUMMY_HEALTH
  const indicatorColor =
    health.status === "Stable"
      ? "bg-emerald-500"
      : health.status === "Critical"
        ? "bg-rose-500"
        : "bg-amber-500"

  if (loading) {
    return (
      <Card className="border-border/50 shadow-sm animate-pulse">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">System Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 shadow-sm overflow-hidden min-h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            System Monitoring
        </CardTitle>
        <div className="relative">
            <motion.div 
               animate={{ scale: [1, 1.2, 1] }} 
               transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
               className={`w-2 h-2 rounded-full ${indicatorColor}`} 
            />
            <div className={`absolute inset-0 rounded-full blur-[2px] opacity-50 ${indicatorColor}`} />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Status */}
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {health.status}
          </span>
          <p className="text-xs text-muted-foreground font-medium">Operations snapshot for approvals, jobs, and hiring flow</p>
        </div>

        <div className="space-y-3">
            <HealthRow
              label="Pending Companies"
              value={health.pendingCompanies}
              icon={Building2}
              color="text-sky-500"
            />

            <HealthRow
              label="Paused Jobs"
              value={health.pausedJobs}
              icon={BriefcaseBusiness}
              color="text-amber-500"
            />

            <HealthRow
              label="Applications Today"
              value={health.applicationsToday}
              icon={AlertCircle}
              color="text-emerald-500"
            />
        </div>
      </CardContent>
    </Card>
  )
}

/* ---------------- Helper Components ---------------- */

function HealthRow({
  label,
  value,
  icon: Icon,
  color
}: {
  label: string
  value: number
  icon: any
  color: string
}) {
  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 group hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-3">
        <Icon className={`h-4 w-4 ${color}`} />
        <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{label}</span>
      </div>
      <span className="text-sm font-bold text-foreground">{value}</span>
    </div>
  )
}
