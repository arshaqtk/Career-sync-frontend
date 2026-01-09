import { useState } from "react"
import { useParams } from "react-router-dom"
import { PageHeader } from "../components/shared/PageHeader"
import { useAdminCandidateDetail } from "../hooks/useAdminCandidatesDetails"
import { useCandidateStatusAction } from "../hooks/useToggleCandidateStatus"
import { ConfirmStatusDialog } from "../components/dialogs/ConfirmBlockUser"

import { CandidateProfileCard } from "../components/Candidates/DetailView/CandidateProfileCard"
import { CandidateSkillsCard } from "../components/Candidates/DetailView/CandidateSkillsCard"
import { CandidateExperienceCard } from "../components/Candidates/DetailView/CandidateExperienceCard"
import { CandidateActionCard } from "../components/Candidates/DetailView/CandidateActionCard"
import { SectionSkeleton } from "@/components/Loaders"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { CandidateBlockedInfoCard } from "../components/Candidates/DetailView/candidateBlockedInfo"

type Status = "active" | "blocked"

export default function CandidateDetailPage() {
  const { id } = useParams()
  const { data ,isLoading,error} = useAdminCandidateDetail(id!)
  const { mutate, isPending } = useCandidateStatusAction()


  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState<Status | null>(null)
 if (isLoading) return <SectionSkeleton/>
  if(error)handleRQError(error)

  if (!data) return null

  const candidate = data.data

  return (
    <>
      <PageHeader title={candidate.name} subtitle={candidate.email} />

      <div className="grid lg:grid-cols-3 gap-6 mb-3">
        <div className="lg:col-span-2 space-y-6">
          <CandidateProfileCard candidate={candidate} />
          <CandidateSkillsCard skills={candidate.candidateData.skills} />
          <CandidateExperienceCard
            experience={candidate.candidateData.experience}
          />
        </div>

        <div className="space-y-6 sticky top-20">
          <CandidateActionCard
          
            status={candidate.isActive?"active":"blocked"}
            onAction={(status) => {
              console.log("Action clicked, status:", status)
              setCurrentStatus(status)
              setDialogOpen(true) 
            }}
          />
          
           {!candidate.isActive && (
          <CandidateBlockedInfoCard blockedAt={candidate.blockedAt} blockedReason={candidate.blockReason} />
           )}
        </div>
      </div>

     
      <ConfirmStatusDialog
        open={dialogOpen}
        entityName="candidate"
        currentStatus={currentStatus}
        loading={isPending}
        onClose={() => setDialogOpen(false)}
        onConfirm={({ currentStatus, reason }) => {
          mutate(
            {
              candidateId: candidate._id,
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
