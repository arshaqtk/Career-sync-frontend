import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table"
import { Button } from "@/components/ui/shadcn/button"
import { Badge } from "@/components/ui/shadcn/badge"
import { Skeleton } from "@/components/ui/shadcn/skeleton"
import { useNavigate } from "react-router-dom"

export interface ModeratedJob {
  id: string
  title: string
  recruiter: string
  reports: number
  status: "Active" | "Flagged" | "Removed"
  postedAt: string
}

interface JobModerationProps {
  data?: ModeratedJob[]
  loading?: boolean
  onRemoveJob?: (jobId: string) => void
  onWarnRecruiter?: (jobId: string) => void
}


export function JobModeration({
  data,
  loading,
  onRemoveJob,
  onWarnRecruiter,
}: JobModerationProps) {
  const jobs = data 
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Job Moderation</CardTitle>
        <Button
          variant="link"
          onClick={() => navigate("/admin/jobs")}
        >
          View all →
        </Button>
      </CardHeader>

      <CardContent>
        {loading ? (
          <SkeletonTable />
        ) : jobs?.length === 0 ? (
          <EmptyState />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Recruiter</TableHead>
                <TableHead>Reports</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {jobs?.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">
                    {job.title}
                  </TableCell>

                  <TableCell>{job.recruiter}</TableCell>

                  <TableCell>
                    {job.reports > 0 ? (
                      <span className="font-semibold text-red-600">
                        {job.reports}
                      </span>
                    ) : (
                      job.reports
                    )}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={job.status} />
                  </TableCell>

                  <TableCell>{job.postedAt}</TableCell>

                  <TableCell className="text-right space-x-2">
                    {job.status !== "Removed" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            onWarnRecruiter?.(job.id)
                          }
                        >
                          Warn
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            onRemoveJob?.(job.id)
                          }
                        >
                          Remove
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

/* ---------------- Helper Components ---------------- */

function StatusBadge({
  status,
}: {
  status: ModeratedJob["status"]
}) {
  const variant =
    status === "Active"
      ? "default"
      : status === "Flagged"
      ? "secondary"
      : "destructive"

  return <Badge variant={variant}>{status}</Badge>
}

function SkeletonTable() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-6 gap-4 items-center"
        >
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-32 ml-auto" />
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-10 text-sm text-muted-foreground">
      No jobs require moderation right now
    </div>
  )
}
