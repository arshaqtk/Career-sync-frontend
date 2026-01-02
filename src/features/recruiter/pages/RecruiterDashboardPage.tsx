import { DashboardHeader } from "../components/dashboard/DashboardHeader"
import { StatsCards } from "../components/dashboard/StatsCards"
import { ActionCenter } from "../components/dashboard/ActionCenter"
import { QuickActions } from "../components/dashboard/QuickActions"
import { RecentApplications } from "../components/dashboard/RecentApplications"
import { TodaysInterviews } from "../components/dashboard/TodaysInterviews"
import { HiringFunnel } from "../components/dashboard/HiringFunnel"
import { useRecruiterDashboard } from "../hooks/useRecruiterDashboard"
import { SectionSkeleton } from "@/components/Loaders"

export default function RecruiterDashboardPage() {
  const { data, isLoading, isError } = useRecruiterDashboard()

  if (isError) return <p>Failed to load dashboard</p>
  if (isLoading) return <SectionSkeleton/>

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      <div className="col-span-12">
        <DashboardHeader />
      </div>

      <div className="col-span-12">
        <StatsCards data={data?.stats} loading={isLoading} />
      </div>

      <div className="col-span-12 lg:col-span-8">
        <ActionCenter data={data?.actions} loading={isLoading} />
      </div>

      <div className="col-span-12 lg:col-span-4">
        <QuickActions />
      </div>

      <div className="col-span-12 lg:col-span-8">
        <RecentApplications
          data={data?.recentApplications}
          loading={isLoading}
        />
      </div>

      <div className="col-span-12 lg:col-span-4">
        <TodaysInterviews
          data={data?.todaysInterviews}
          loading={isLoading}
        />
      </div>

      <div className="col-span-12">
        <HiringFunnel data={data?.funnel} loading={isLoading} />
      </div>
    </div>
  )
}
