import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { RecruiterTable } from "../components/Recruiter/ListView/RecruiterTable"
import { ConfirmStatusDialog } from "../components/dialogs/ConfirmBlockUser"
import { PageHeader } from "../components/shared/PageHeader"

import { useAdminRecruitersList } from "../hooks/useAdminRecruitersList"
import { useRecruiterStatusAction } from "../hooks/useToggleRecruiterStatus"

import { Input } from "@/components/ui/shadcn/input"
import { Card, CardContent } from "@/components/ui/shadcn/card"
import { Button } from "@/components/ui/shadcn/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select"
import { Spinner } from "@/components/ui/shadcn/spinner"

type Status = "active" | "blocked" | "all"

export default function RecruitersListPage() {
  const navigate = useNavigate()

  // 🔹 pagination + filters
  const [page, setPage] = useState(1)
  const limit = 10
  const [status, setStatus] = useState<Status>("all")
  const [search, setSearch] = useState("")

  const { data, isLoading } = useAdminRecruitersList({
    page,
    limit,
    status,
    search,
  })

  const { mutate, isPending } = useRecruiterStatusAction()

  // 🔹 dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [currentStatus, setCurrentStatus] =
    useState<"active" | "blocked" | null>(null)

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }


  const recruiters = data.recruiters
  const pagination = data.pagination

  return (
    <>
      <PageHeader
        title="Recruiters"
        subtitle="Manage and review recruiter profiles"
      />

      <Card>
        <CardContent className="space-y-4">
          {/* 🔍 Filters */}
          <div className="flex flex-wrap gap-3">
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

          {/* 🔢 Pagination */}
          {pagination && (
            <div className="flex justify-end items-center gap-3 pt-2">
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
            entityName="recruiter"
            currentStatus={currentStatus}
            loading={isPending}
            onClose={() => setDialogOpen(false)}
            onConfirm={({ currentStatus, reason }) => {
              mutate(
                {
                  recruiterId: selectedId!,
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
        </CardContent>
      </Card>
    </>
  )
}
