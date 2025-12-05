import { StatsCard } from "../cards/stats-card";

export function StatsGrid() {
  const stats = [
    { label: "Open Positions", value: 8, note: "+2 this month", icon: "Briefcase" },
    { label: "Applications Today", value: 24, note: "+12 from yesterday", icon: "Users" },
    { label: "Interviews Today", value: 3, note: "2 completed", icon: "Calendar" },
    { label: "Offer Acceptance", value: "87%", note: "+5% this quarter", icon: "TrendingUp" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(stat => (
        <StatsCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
