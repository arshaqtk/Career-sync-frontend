import DashBoardLayout from "@/layouts/dashboard-layout";
import { DashboardHeader } from "./dashboardHeader";
import { RecentApplications } from "./recentApplicationsection";
import { StatsGrid } from "./statsGrid";
import { TodayInterviews } from "./todayInterview";

export function RecruiterDashboard() {
  return (
    <DashBoardLayout>

    <div className="p-6 space-y-8">
      <DashboardHeader title="Recruiter Dashboard" subtitle="Manage your hiring pipeline efficiently" />

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentApplications />
        <TodayInterviews />
      </div>
    </div>
    </DashBoardLayout>
  );
}
