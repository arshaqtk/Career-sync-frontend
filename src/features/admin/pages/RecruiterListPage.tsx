import { useState } from "react"
import { RecruiterTable } from "../components/Recruiter/ListView/RecruiterTable"
import { Input } from "@/components/ui/shadcn/input"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card"
import { useNavigate } from "react-router-dom"
import { useAdminRecruitersList } from "../hooks/useAdminRecruitersList"
import { useRecruiterStatusAction } from "../hooks/useToggleRecruiterStatus"
import { ConfirmStatusDialog } from "../components/dialogs/ConfirmBlockUser"

type Status = "active" | "blocked"

export default function RecruitersListPage() {
  const navigate = useNavigate()
  const { data, isLoading } = useAdminRecruitersList()
  const { mutate, isPending } = useRecruiterStatusAction()

  // ✅ dialog-related state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [currentStatus, setCurrentStatus] = useState<Status | null>(null)

  if (isLoading) {
    return <div>Loading...</div>
  }

  const recruiters = data.recruiters

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruiter Management</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          placeholder="Search recruiter..."
          className="max-w-sm"
        />

        {/* ✅ Table only OPENS dialog */}
        <RecruiterTable
          recruiters={recruiters}
          onView={(id) =>
            navigate(`/admin/recruiters/${id}`)
          }
          onStatusAction={(id, status) => {
            setSelectedId(id)
            setCurrentStatus(status)
            setDialogOpen(true)
          }}
        />

        {/* ✅ Mutation happens ONLY here */}
        <ConfirmStatusDialog
          open={dialogOpen}
          entityName="recruiter"
          currentStatus={currentStatus}
          loading={isPending}
          onClose={() => setDialogOpen(false)}
          onConfirm={({ currentStatus, reason }) => {
            mutate(
              {
                recruiterId: selectedId!,
                currentStatus,
                reason, // 🔒 required when blocking
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
      </CardContent>
    </Card>
  )
}
