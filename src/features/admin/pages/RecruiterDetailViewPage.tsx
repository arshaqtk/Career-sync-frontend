import { useState } from "react"
import { useParams } from "react-router-dom"

import { useAdminRecruiterDetail } from "../hooks/useAdminRecruiterDetail"
import { useRecruiterStatusAction } from "../hooks/useToggleRecruiterStatus"
import { ConfirmStatusDialog } from "../components/dialogs/ConfirmBlockUser"

import { RecruiterHeader } from "../components/Recruiter/Detailview/RecruiterHeader"
import { PersonalInfoCard } from "../components/Recruiter/Detailview/PersonalInfoCard"
import { CompanyInfoCard } from "../components/Recruiter/Detailview/CompanyInfoCard"
import { RecruiterActivityCard } from "../components/Recruiter/Detailview/RecruiterActivityCard"
import { SectionSkeleton } from "@/components/Loaders"
import { handleRQError } from "@/lib/react-query/errorHandler"

type Status = "active" | "blocked"

export default function RecruiterDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError,error } = useAdminRecruiterDetail(id!)
  const { mutate, isPending } = useRecruiterStatusAction()

  // ✅ dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentStatus, setCurrentStatus] = useState<Status | null>(null)

  if (isLoading) return <SectionSkeleton/>
 

  if (isError || !data) {
    handleRQError(error)
    return (
      <p className="text-center text-red-500">
        Failed to load recruiter details
      </p>
    )
  }

  const recruiter = data.data

  return (
    <>
      <div className="space-y-6">
        <RecruiterHeader
          name={recruiter.name}
          status={recruiter.isActive?"active":"blocked"}
          loading={isPending}
          onAction={(status) => {
            setCurrentStatus(status)
            setDialogOpen(true)
          }}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <PersonalInfoCard recruiter={recruiter} />
          <CompanyInfoCard company={recruiter.recruiterData} />
        </div>

        <RecruiterActivityCard recruiter={recruiter} />
      </div>

     
      <ConfirmStatusDialog
        open={dialogOpen}
        entityName="recruiter"
        currentStatus={currentStatus}
        loading={isPending}
        onClose={() => setDialogOpen(false)}
        onConfirm={({ currentStatus, reason }) => {
          mutate(
            {
              recruiterId: recruiter._id,
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
