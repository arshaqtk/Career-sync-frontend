import { DashboardHeader } from "../components/dashboard/DashboardHeader"
import { StatsCards } from "../components/dashboard/StatsCards"
import { ActionCenter } from "../components/dashboard/ActionCenter"
import { QuickActions } from "../components/dashboard/QuickActions"
import { RecentApplications } from "../components/dashboard/RecentApplications"
// import { TodaysInterviews } from "../components/dashboard/TodaysInterviews"
import { HiringFunnel } from "../components/dashboard/HiringFunnel"
import { useRecruiterDashboard } from "../hooks/useRecruiterDashboard"
import { DashboardSkeleton } from "@/components/Loaders"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { AddJobModal } from "../components/job/jobModal"
import { useAddJob } from "../hooks/useAddJob"
import type { Job } from "../types/job.type"

export default function RecruiterDashboardPage() {
  const { data, isLoading, isError,error } = useRecruiterDashboard()
  const { mutate: addJob } = useAddJob();

  if (isLoading) return <DashboardSkeleton />
  if (isError && error) {
    handleRQError(error)
    return <p>Failed to load dashboard</p>
  }

 const handleModalSubmission = (payload: {
    job: Job;
  }) => {
      addJob({ data: payload.job });
  };
  return (
    <div className="space-y-6 p-4 md:p-6">
      <AddJobModal onSubmit={handleModalSubmission} />

      <div>
        <DashboardHeader />
      </div>

      <div>
        <StatsCards data={data?.stats} loading={isLoading} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ActionCenter data={data?.actions} loading={isLoading} />
        </div>

        <div className="xl:col-span-4">
          <QuickActions />
        </div>
      </div>

      <div>
        <RecentApplications
          data={data?.recentApplications||[]}
          loading={isLoading}
        />
      </div>

      <div>
        <HiringFunnel data={data?.funnel} loading={isLoading} />
      </div>
    </div>
  )
}
