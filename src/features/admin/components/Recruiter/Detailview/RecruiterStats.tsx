import { StatCard } from "./StatCard"

export function RecruiterStats({
  stats,
  lastActive,
}: {
  stats: { jobs: number; applications: number }
  lastActive: string
}) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard label="Jobs Posted" value={stats.jobs} />
      <StatCard label="Applications" value={stats.applications} />
      <StatCard label="Last Active" value={lastActive} />
    </div>
  )
}
