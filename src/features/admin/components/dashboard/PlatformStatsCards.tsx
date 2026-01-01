import { Card, CardContent } from "@/components/ui/shadcn/card"
import { Skeleton } from "@/components/ui/shadcn/skeleton"

interface PlatformStat {
  label: string
  value: number
}

interface PlatformStatsCardsProps {
  data?: PlatformStat[]
  loading?: boolean
}

const DUMMY_STATS: PlatformStat[] = [
  { label: "Total Users", value: 3200 },
  { label: "Recruiters", value: 240 },
  { label: "Candidates", value: 2960 },
  { label: "Job Posts", value: 820 },
  { label: "Applications (30d)", value: 5400 },
]

export function PlatformStatsCards({
    data,
    loading,
}: PlatformStatsCardsProps) {
    const stats = data ?? DUMMY_STATS
    console.log(stats)
    
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      {stats.map((stat) => (
        <StatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
        />
      ))}
    </div>
  )
}

/* ---------------- Sub Component ---------------- */

function StatCard({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <h3 className="text-2xl font-semibold mt-1">
          {value.toLocaleString()}
        </h3>
      </CardContent>
    </Card>
  )
}
