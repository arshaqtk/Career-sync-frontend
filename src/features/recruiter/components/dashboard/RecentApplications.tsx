import { Eye, CheckCircle, XCircle } from "lucide-react"
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

interface Application {
  id: string
  candidateName: string
  jobTitle: string
  experience: string
  status: "Applied" | "Shortlisted" | "Rejected"
}

interface RecentApplicationsProps {
  data?: Application[]
  loading?: boolean
}

const DUMMY_APPLICATIONS: Application[] = [
  {
    id: "1",
    candidateName: "Arjun Nair",
    jobTitle: "React Developer",
    experience: "2.5 yrs",
    status: "Applied",
  },
  {
    id: "2",
    candidateName: "Fathima Minsha",
    jobTitle: "Backend Developer",
    experience: "3 yrs",
    status: "Shortlisted",
  },
  {
    id: "3",
    candidateName: "Rahul Das",
    jobTitle: "Full Stack Developer",
    experience: "1.8 yrs",
    status: "Applied",
  },
]

export function RecentApplications({
  data,
  loading,
}: RecentApplicationsProps) {
  const applications = data ?? DUMMY_APPLICATIONS

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
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

                  <TableCell>{app.experience}</TableCell>

                  <TableCell>
                    <StatusBadge status={app.status} />
                  </TableCell>

                  <TableCell className="text-right space-x-2">
                    <Button size="icon" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button size="icon" variant="ghost">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </Button>

                    <Button size="icon" variant="ghost">
                      <XCircle className="h-4 w-4 text-red-600" />
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

function StatusBadge({ status }: { status: Application["status"] }) {
  const variant =
    status === "Applied"
      ? "secondary"
      : status === "Shortlisted"
      ? "default"
      : "destructive"

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
