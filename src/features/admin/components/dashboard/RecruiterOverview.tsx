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

export interface RecruiterOverviewItem {
  _id: string
  name: string
  company: string
  jobPosted: number
  status: "Active" | "Blocked"
  lastActive: string
}

interface RecruiterOverviewProps {
  data?: RecruiterOverviewItem[]
  loading?: boolean
  onToggleStatus?: (id: string, status: "Active" | "Blocked") => void
}



export function RecruiterOverview({
  data,
  loading,
  onToggleStatus,
}: RecruiterOverviewProps) {
  const recruiters = data

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruiter Overview</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <SkeletonTable />
        ) : recruiters?.length === 0 ? (
          <EmptyState />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recruiter</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Jobs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {recruiters?.map((rec) => (
                <TableRow key={rec._id}>
                  <TableCell className="font-medium">
                    {rec.name}
                  </TableCell>

                  <TableCell>{rec.company}</TableCell>

                  <TableCell>{rec.jobPosted}</TableCell>

                  <TableCell>
                    <StatusBadge status={rec.status} />
                  </TableCell>

                  <TableCell>{rec.lastActive}</TableCell>

                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant={
                        rec.status === "Active"
                          ? "destructive"
                          : "outline"
                      }
                      onClick={() =>
                        onToggleStatus?.(
                          rec._id,
                          rec.status === "Active"
                            ? "Active"
                            : "Blocked"
                        )
                      }
                    >
                      {rec.status === "Active"
                        ? "Block"
                        : "Unblock"}
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

function StatusBadge({
  status,
}: {
  status: "Active" | "Blocked"
}) {
  return (
    <Badge
      variant={status === "Active" ? "default" : "destructive"}
    >
      {status}
    </Badge>
  )
}

function SkeletonTable() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-6 gap-4 items-center"
        >
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-24 ml-auto" />
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-10 text-sm text-muted-foreground">
      No recruiters found
    </div>
  )
}
