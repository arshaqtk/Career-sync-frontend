import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table"
import { StatusBadge } from "../../shared/StatusBadge"
import { CandidateActions } from "./CandidateActions"

type Status = "active" | "blocked"

export function CandidateTable({
  candidates,
  onView,
  onStatusAction,
}: {
  candidates: any[]
  onView: (id: string) => void
  onStatusAction: (id: string, currentStatus: Status) => void
}) {
  return (
    <div className="bg-white border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {candidates.length ? (
            candidates.map((c) => (
              <TableRow key={c._id}>
                <TableCell className="font-medium">
                  {c.name}
                </TableCell>

                <TableCell>{c.email}</TableCell>

                <TableCell>{c.applicationCount}</TableCell>

                <TableCell>
                  <StatusBadge status={c.status} />
                </TableCell>

                <TableCell className="text-right">
                  <CandidateActions
                    status={c.status}
                    onView={() => onView(c._id)}
                    onAction={(status) =>
                      onStatusAction(c._id, status)
                    }
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No candidates found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
