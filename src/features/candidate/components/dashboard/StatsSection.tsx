import { Briefcase, Calendar, Award } from "lucide-react";
import StatCard from "@/features/candidate/components/cards/stat-card";

export default function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
      <StatCard
        title="Active Applications"
        value={12}
        subtitle="+3 this week"
        icon={<Briefcase className="text-purple-600" />}
      />

      <StatCard
        title="Upcoming Interviews"
        value={2}
        subtitle="Next: Tomorrow 2 PM"
        icon={<Calendar className="text-purple-600" />}
      />

      <StatCard
        title="Offers Received"
        value={1}
        subtitle="Pending response"
        icon={<Award className="text-purple-600" />}
      />
    </div>
  );
}
