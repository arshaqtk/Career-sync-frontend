import { ApplicationHeader } from "../components/applications/application-detail/ApplicationHeader"
import { ApplicationTimeline } from "../components/applications/application-detail/ApplicationTimeline"
import { CandidateDetailsCard } from "../components/applications/application-detail/CandidateDetails"
import { Documentscard } from "../components/applications/application-detail/DocumentsCard"
import { JobDetailsCard } from "../components/applications/application-detail/JobOverviewCard"
import { RecruiterInfoCard } from "../components/applications/application-detail/RecruiterInfo"
import { ApplicationStatusCard } from "../components/applications/application-detail/StatusCard"
import { useApplicationDetailViewData } from "../hooks/useApplicationDetails"
import { useParams } from "react-router-dom"
import { toast } from "sonner"
import { SectionSkeleton } from "@/components/Loaders"
import { handleRQError } from "@/lib/react-query/errorHandler"

export const CandidateApplicationDetailPage = () => {
  const { applicationId } = useParams()

  const {
    data: application,
    isLoading,
    isError,
    error
  } = useApplicationDetailViewData(applicationId!)

  if (isLoading) {
    return <SectionSkeleton />
  }

  if (isError || !application) {
    toast.error("Failed to fetch application")
    return <div>Unable to load application</div>
  }
  if (error) handleRQError(error)



  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto max-w-6xl px-4 md:px-6 pt-6">
        <ApplicationHeader
          jobTitle={application.job.title}
          company={application.job.company}
          status={application.application.status}
          appliedAt={application.application.appliedAt}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            <JobDetailsCard job={application.job} />
            <CandidateDetailsCard application={application.application} />
            <Documentscard application={application.application} />
            <ApplicationTimeline status={application.application.status} />
          </div>

          {/* Right Column: Status & Contact */}
          <div className="space-y-8 sticky top-24 self-start">
            <ApplicationStatusCard application={application.application} />
            <RecruiterInfoCard
              id={application.recruiter.id}
              name={application.recruiter.name}
              email={application.recruiter.email}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

