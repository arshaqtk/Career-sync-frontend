import { Eye } from "lucide-react"
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
import type { RecentApplication as DashboardRecentApplication } from "../../types/dashboard.types"

interface RecentApplicationsProps {
  data: DashboardRecentApplication[]
  loading?: boolean
}

export function RecentApplications({
  data,
  loading,
}: RecentApplicationsProps) {
  const applications = data 
const navigate=useNavigate()
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Recent Applications</CardTitle>
        <Button variant="outline" size="sm" onClick={() => navigate("/recruiter/applicants")}>
          View all
        </Button>
      </CardHeader>

      <CardContent>
        {loading ? (
          <SkeletonTable />
        ) : applications.length === 0 ? (
          <EmptyState />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">
                    {app.candidateName}
                  </TableCell>

                  <TableCell>{app.jobTitle}</TableCell>

                  <TableCell>{app.experience || "Not specified"}</TableCell>

                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        navigate(
                          app.jobId
                            ? `/recruiter/jobs/${app.jobId}/applicants/${app.id}`
                            : `/recruiter/applicants/${app.id}`
                        )
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
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

function StatusBadge({ status }: { status: DashboardRecentApplication["status"] }) {
  const variant = (() => {
    switch (status) {
      case "Pending":
      case "Viewed":
        return "secondary"
      case "Shortlisted":
      case "Interview":
      case "Selected":
        return "default"
      case "Rejected":
        return "destructive"
      default:
        return "secondary"
    }
  })()

  return <Badge variant={variant}>{status}</Badge>
}

function SkeletonTable() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-5 gap-4 items-center"
        >
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-24 ml-auto" />
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-10 text-sm text-muted-foreground">
      No recent applications found
    </div>
  )
}
