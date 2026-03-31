import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card"
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

import { motion } from "framer-motion"
import { ShieldCheck, AlertCircle } from "lucide-react"

export function SystemHealth({
  data,
  loading,
}: SystemHealthProps) {
  const health = data ?? DUMMY_HEALTH

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
               className={`w-2 h-2 rounded-full ${health.status === 'Stable' ? 'bg-emerald-500' : 'bg-amber-500'}`} 
            />
            <div className={`absolute inset-0 rounded-full blur-[2px] opacity-50 ${health.status === 'Stable' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Status */}
        <div className="flex flex-col gap-1">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {health.status}
          </span>
          <p className="text-xs text-muted-foreground font-medium">Platform systems operational</p>
        </div>

        <div className="space-y-3">
            {/* Flagged Jobs */}
            <HealthRow
              label="Flagged Listings"
              value={health.flaggedJobs}
              icon={AlertCircle}
              color="text-amber-500"
            />

            {/* Blocked Recruiters */}
            <HealthRow
              label="Restricted Accounts"
              value={health.blockedRecruiters}
              icon={ShieldCheck}
              color="text-emerald-500"
            />
        </div>

        {/* Last Incident */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Security Logs</span>
            <span className="text-sm font-medium text-foreground">
                {health.lastIncident ?? "No recent security events"}
            </span>
          </div>
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
