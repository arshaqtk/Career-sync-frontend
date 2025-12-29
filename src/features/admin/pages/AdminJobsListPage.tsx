import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Card,
  CardContent,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/shadcn/card"
import { Input } from "@/components/ui/shadcn/input"
import { Spinner } from "@/components/ui/shadcn/spinner"
import { Button } from "@/components/ui/shadcn/button"

import { JobTable } from "../components/jobs/ListView/JobTable"
import { ConfirmStatusDialog } from "../components/dialogs/confirmBlockJob"

import { useAdminJobsList } from "../hooks/useAdminJobsList"
import { useAdminJobStatusAction } from "../hooks/useJobStatusAction"
import { PageHeader } from "../components/shared/PageHeader"

type JobStatus = "active" | "blocked" | "closed"

export default function JobsListPage() {
  const navigate = useNavigate()

 
  const [page, setPage] = useState(1)
  const limit = 10

  const { data, isLoading } = useAdminJobsList({
    page,
    limit,
  })

  const { mutate, isPending } = useAdminJobStatusAction()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)
  const [currentStatus, setCurrentStatus] =
    useState<JobStatus | null>(null)

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    )
  }

  const jobs = data?.data.jobs ?? []
  const pagination = data?.data.pagination

  return (
    <>
     <PageHeader
        title="Jobs"
        subtitle="Manage and review jobs"
      />
      <Card>
       
      {/* <CardHeader>
        <CardTitle>Job Management</CardTitle>
      </CardHeader> */}

      <CardContent className="space-y-4">
        <Input
          placeholder="Search job title or company..."
          className="max-w-sm"
        />

        <JobTable
          jobs={jobs}
          onView={(jobId) =>
            navigate(`/admin/jobs/${jobId}`)
          }
          onAction={(jobId, status) => {
            setSelectedJobId(jobId)
            setCurrentStatus(status)
            setDialogOpen(true)
          }}
        />

      
        {pagination && (
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Previous
            </Button>

            <span className="flex items-center text-sm text-muted-foreground">
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

        <ConfirmStatusDialog
          open={dialogOpen}
          entityName="job"
          currentStatus={currentStatus}
          loading={isPending}
          onClose={() => setDialogOpen(false)}
          onConfirm={({ currentStatus, reason }) => {
            mutate(
              {
                jobId: selectedJobId!,
                currentStatus,
                reason,
              },
              {
                onSuccess: () => {
                  setDialogOpen(false)
                  setSelectedJobId(null)
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
