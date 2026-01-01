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
import { Skeleton } from "@/components/ui/shadcn/skeleton"

export interface SystemLogItem {
  id: string
  action: string
  actor: string
  target?: string
  createdAt: string
}

interface RecentSystemLogsProps {
  data?: SystemLogItem[]
  loading?: boolean
}

const DUMMY_LOGS: SystemLogItem[] = [
  {
    id: "1",
    action: "Blocked recruiter account",
    actor: "Admin",
    target: "Bridgeon Solutions",
    createdAt: "2026-01-01 10:30 AM",
  },
  {
    id: "2",
    action: "Removed job post",
    actor: "Admin",
    target: "React Developer",
    createdAt: "2025-12-31 05:45 PM",
  },
  {
    id: "3",
    action: "Unblocked recruiter account",
    actor: "Admin",
    target: "TechNova Pvt Ltd",
    createdAt: "2025-12-30 02:10 PM",
  },
]

export function RecentSystemLogs({
  data,
  loading,
}: RecentSystemLogsProps) {
  const logs = data ?? DUMMY_LOGS

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent System Logs</CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <SkeletonTable />
        ) : logs.length === 0 ? (
          <EmptyState />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">
                    {log.action}
                  </TableCell>

                  <TableCell>{log.actor}</TableCell>

                  <TableCell>
                    {log.target ?? "-"}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {log.createdAt}
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

function SkeletonTable() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-4 gap-4 items-center"
        >
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-32" />
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-10 text-sm text-muted-foreground">
      No system logs available
    </div>
  )
}
