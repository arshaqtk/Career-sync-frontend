export function CandidateStatsCard({ stats }: any) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Stat label="Applied" value={stats.total} />
      <Stat label="Shortlisted" value={stats.shortlisted} />
      <Stat label="Rejected" value={stats.rejected} />
      <Stat label="Offers" value={stats.offers} />
    </div>
  )
}

function Stat({ label, value }: any) {
  return (
    <div className="bg-white border rounded p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  )
}
