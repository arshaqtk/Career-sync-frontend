import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CandidateTable } from "../components/Candidates/ListView/CandidateTable"
import { ConfirmStatusDialog } from "../components/dialogs/ConfirmBlockUser"
import { useAdminCandidatesList } from "../hooks/useAdminCandidatesList"
import { useCandidateStatusAction } from "../hooks/useToggleCandidateStatus"

type Status = "active" | "blocked"

export default function CandidatesListPage() {
  const navigate = useNavigate()
  const { data, isLoading } = useAdminCandidatesList()
  const { mutate, isPending } = useCandidateStatusAction()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [currentStatus, setCurrentStatus] =
    useState<Status | null>(null)

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      <CandidateTable
        candidates={data.data.candidates}
        onView={(id) =>
          navigate(`/admin/candidates/${id}`)
        }
        onStatusAction={(id, status:Status) => {
          setSelectedId(id)
          setCurrentStatus(status)
          setDialogOpen(true)
        }}
      />

      <ConfirmStatusDialog
        open={dialogOpen}
        entityName="candidate"
        currentStatus={currentStatus}
        loading={isPending}
        onClose={() => setDialogOpen(false)}
        onConfirm={({ currentStatus, reason }:{currentStatus:Status, reason:string}) => {
          mutate(
            {
              candidateId: selectedId!,
              currentStatus,
              reason, 
            },
            {
              onSuccess: () => {
                setDialogOpen(false)
                setSelectedId(null)
                setCurrentStatus(null)
              },
            }
          )
        }}
      />
    </>
  )
}
