import { Briefcase, Users, CalendarCheck, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/shadcn/card"
import { Skeleton } from "@/components/ui/shadcn/skeleton"

interface StatsCardsProps {
  data?: {
    activeJobs: number
    newApplications: number
    interviewsToday: number
    hiredCandidates: number
  }
  loading?: boolean
}

const DUMMY_STATS = {
  activeJobs: 6,
  newApplications: 24,
  interviewsToday: 3,
  hiredCandidates: 2,
}

export function StatsCards({ data, loading }: StatsCardsProps) {
  const stats = data ?? DUMMY_STATS

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Active Jobs"
        value={stats.activeJobs}
        icon={<Briefcase className="h-5 w-5 text-blue-600" />}
      />

      <StatCard
        title="New Applications"
        value={stats.newApplications}
        icon={<Users className="h-5 w-5 text-indigo-600" />}
      />

      <StatCard
        title="Interviews Today"
        value={stats.interviewsToday}
        icon={<CalendarCheck className="h-5 w-5 text-orange-600" />}
      />

      <StatCard
        title="Hired Candidates"
        value={stats.hiredCandidates}
        icon={<CheckCircle className="h-5 w-5 text-green-600" />}
      />
    </div>
  )
}

/* ---------------- Sub Component ---------------- */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string
  value: number
  icon: React.ReactNode
}) {
  return (
    <Card className="hover:shadow-md transition">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-semibold mt-1">{value}</h3>
        </div>

        <div className="p-3 rounded-full bg-muted">{icon}</div>
      </CardContent>
    </Card>
  )
}
