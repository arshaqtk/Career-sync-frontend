import { Card, CardContent } from "@/components/ui/shadcn/card"
import { Skeleton } from "@/components/ui/shadcn/skeleton"
import { User, Building2, Briefcase, ClipboardList, Users, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlatformStat {
  label: string
  value: number
  trend?: string
  trendUp?: boolean
  type?: string
}

interface PlatformStatsCardsProps {
  data?: PlatformStat[]
  loading?: boolean
}



export function PlatformStatsCards({
  data,
  loading,
}: PlatformStatsCardsProps) {
  const stats = data

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="shadow-sm border-gray-100 rounded-xl">
            <CardContent className="p-5 space-y-4">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-8 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats?.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          trend={stat.trend}
          trendUp={stat.trendUp}
          type={stat.type}
        />
      ))}
    </div>
  )
}

/* ---------------- Sub Component ---------------- */

function StatCard({
  label,
  value,
  type,
}: PlatformStat) {

  // Design properties based on type
  const styleConfig: Record<string, { icon: React.ElementType, bgClass: string, iconClass: string }> = {
    "users": { icon: User, bgClass: "bg-blue-500/10", iconClass: "text-blue-500" },
    "companies": { icon: Building2, bgClass: "bg-cyan-500/10", iconClass: "text-cyan-500" },
    "jobs": { icon: Briefcase, bgClass: "bg-amber-500/10", iconClass: "text-amber-500" },
    "apps": { icon: ClipboardList, bgClass: "bg-indigo-500/10", iconClass: "text-indigo-500" },
    "new-users": { icon: Users, bgClass: "bg-fuchsia-500/10", iconClass: "text-fuchsia-500" },
    "jobs-today": { icon: FileText, bgClass: "bg-emerald-500/10", iconClass: "text-emerald-500" },
  };

  const config = type && styleConfig[type] ? styleConfig[type] : styleConfig["users"];
  const Icon = config.icon;

  // Formatting value elegantly
  const formatValue = (num: number) => {
    if (num >= 1000) {
      const k = num / 1000;
      return k % 1 === 0 ? `${k}k` : `${k.toFixed(1)}k`;
    }
    return num.toLocaleString();
  };

  return (
    <Card className="hover:shadow-lg transition-all border-border/50 shadow-sm rounded-xl">
      <CardContent className="p-5 flex flex-col justify-between h-full">
        {/* Top Section */}
        <div className="flex justify-between items-start mb-4">
          <div className={cn("p-2.5 rounded-lg", config.bgClass)}>
            <Icon className={cn("w-5 h-5", config.iconClass)} />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto">
          <p className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase mb-1">{label}</p>
          <h3 className="text-2xl font-bold text-foreground tracking-tight">
            {formatValue(value)}
          </h3>
        </div>
      </CardContent>
    </Card>
  )
}
