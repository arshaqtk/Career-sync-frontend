import { useState } from "react"
import { useParams } from "react-router-dom"

import { ConfirmStatusDialog } from "../components/dialogs/confirmBlockJob"
import { useAdminJobDetail } from "../hooks/useAdminJobDetail"
import { useAdminJobStatusAction } from "../hooks/useJobStatusAction"

import { JobHeader } from "../components/jobs/DetailView/JobHeader"
import { JobOverviewCard } from "../components/jobs/DetailView/JobOverviewCard"
import { JobDescriptionCard } from "../components/jobs/DetailView/JobDescriptionCard"
import { JobSkillsCard } from "../components/jobs/DetailView/JobSkillsCard"
import { JobStatsCard } from "../components/jobs/DetailView/JobStatsCard"
import { RecruiterInfoCard } from "../components/jobs/DetailView/RecruiterInfoCard"
import { JobActionCard } from "../components/jobs/DetailView/JobActionCard"
import {  SectionSkeleton } from "@/components/Loaders"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { JobBlockedInfoCard } from "../components/jobs/DetailView/jobBlockedInfoCard"

type Status = "active" | "blocked" | "closed"

export default function AdminJobDetailPage() {
  const { id } = useParams()
  const { data, isLoading,error } = useAdminJobDetail(id!)
  const { mutate, isPending } = useAdminJobStatusAction()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentStatus, setCurrentStatus] =
    useState<Status | null>(null)

  if (isLoading) return <SectionSkeleton/>
  if(error)handleRQError(error)

  const job = data.data

  return (
    <>
      <JobHeader
        title={job.title}
        company={job.company}
        status={job.status}
      />

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          <JobOverviewCard job={job} />
          <JobDescriptionCard description={job.description} />
          <JobSkillsCard skills={job.skills} />
        </div>

        <div className="space-y-6 sticky top-20">
          <JobStatsCard
            applications={job.applicationCount}
            createdAt={job.createdAt}
          />
          <RecruiterInfoCard recruiter={job.recruiter} />

           {job.status === "blocked" && (
    <JobBlockedInfoCard
      blockedAt={job.blockedAt}
      blockedReason={job.blockReason}
    />
  )}

          <JobActionCard
            status={job.status}
            onAction={(status) => {
              setCurrentStatus(status)
              setDialogOpen(true)
            }}
          />
        </div>
      </div>

      <ConfirmStatusDialog
        open={dialogOpen}
        entityName="job"
        currentStatus={currentStatus}
        loading={isPending}
        onClose={() => setDialogOpen(false)}
        onConfirm={({ currentStatus, reason }) => {
          mutate(
            {
              jobId: job._id,
              currentStatus,
              reason,
            },
            {
              onSuccess: () => {
                setDialogOpen(false)
                setCurrentStatus(null)
              },
            }
          )
        }}
      />
    </>
  )
}
