import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { CandidateTable } from "../components/Candidates/ListView/CandidateTable"
import { ConfirmStatusDialog } from "../components/dialogs/ConfirmBlockUser"
import { PageHeader } from "../components/shared/PageHeader"
import { useAdminCandidatesList } from "../hooks/useAdminCandidatesList"
import { useCandidateStatusAction } from "../hooks/useToggleCandidateStatus"
import { Input } from "@/components/ui/shadcn/input"
import { Button } from "@/components/ui/shadcn/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select"
import { SectionSkeleton } from "@/components/Loaders"
import { handleRQError } from "@/lib/react-query/errorHandler"

type Status = "active" | "blocked" | "all"

export default function CandidatesListPage() {
  const navigate = useNavigate()

  // 🔹 pagination + filters
  const [page, setPage] = useState(1)
  const limit = 10
  const [status, setStatus] = useState<Status>("all")
  const [search, setSearch] = useState("")

  const { data, isLoading,error } = useAdminCandidatesList({
    page,
    limit,
    status,
    search,
  })

  const { mutate, isPending } = useCandidateStatusAction()

  // 🔹 dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [currentStatus, setCurrentStatus] =
    useState<"active" | "blocked" | null>(null)

  if (isLoading) return <SectionSkeleton/>
   if(error)handleRQError(error)
 

  const candidates = data.data.candidates
  const pagination = data.data.pagination

  return (
    <>
      <PageHeader
        title="Candidates"
        subtitle="Manage and review candidate profiles"
      />

      {/* 🔍 Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          className="max-w-sm"
        />

        <Select
          value={status}
          onValueChange={(val) => {
            setStatus(val as Status)
            setPage(1)
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 📋 Table */}
      <CandidateTable
        candidates={candidates}
        onView={(id) =>
          navigate(`/admin/candidates/${id}`)
        }
        onStatusAction={(id, status) => {
          setSelectedId(id)
          setCurrentStatus(status)
          setDialogOpen(true)
        }}
      />

      {/* 🔢 Pagination */}
      {pagination && (
        <div className="flex justify-end items-center gap-3 mt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page === pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* 🔒 Confirm Block / Unblock */}
      <ConfirmStatusDialog
        open={dialogOpen}
        entityName="candidate"
        currentStatus={currentStatus}
        loading={isPending}
        onClose={() => setDialogOpen(false)}
        onConfirm={({ currentStatus, reason }) => {
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
