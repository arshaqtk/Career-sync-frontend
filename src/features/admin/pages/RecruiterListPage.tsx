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
import { Search } from "lucide-react"
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

export default function RecruitersListPage() {
  const navigate = useNavigate()

  // 🔹 pagination + filters
  const [page, setPage] = useState(1)
  const limit = 10
  const [status, setStatus] = useState<Status>("all")
  const [search, setSearch] = useState("")

  const { data, isLoading,error } = useAdminRecruitersList({
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

  if (isLoading) return <SectionSkeleton/>
   if(error)handleRQError(error)
 


  const recruiters = data.recruiters
  const pagination = data.pagination

  return (
    <>
      <PageHeader
        title="Recruiters"
        subtitle="Manage and review recruiter profiles"
      />

      <Card className="border-border/50 shadow-sm overflow-hidden">
        <CardContent className="space-y-6 pt-6">
          {/* 🔍 Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-2 border-b border-border/10">
            <div className="relative w-full max-w-sm">
                <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                }}
                className="pl-9 h-11 rounded-xl bg-muted/30 border-none focus-visible:ring-primary/20"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="h-4 w-4" />
                </div>
            </div>

            <Select
              value={status}
              onValueChange={(val) => {
                setStatus(val as Status)
                setPage(1)
              }}
            >
              <SelectTrigger className="w-full md:w-48 h-11 rounded-xl bg-muted/30 border-none">
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
