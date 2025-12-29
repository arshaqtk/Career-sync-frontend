import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table"
import { StatusBadge } from "./StatusBadge"
import { RecruiterActions } from "./RecruiterActions"
import type { RecruiterList } from "../../../types/Recruiter"

type Status = "active" | "blocked"

export function RecruiterTable({
  recruiters,
  onView,
  onStatusAction,
}: {
  recruiters: RecruiterList[]
  onView: (id: string) => void
  onStatusAction: (id: string, currentStatus: Status) => void
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Recruiter</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Jobs Posted</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {recruiters.map((rec) => (
            
          <TableRow key={rec.id}>
            <TableCell className="font-medium">
              {rec.name}
            </TableCell>
            <TableCell>{rec.company}</TableCell>
            <TableCell>{rec.email}</TableCell>
            <TableCell>{rec.jobsPosted}</TableCell>
            <TableCell>
              <StatusBadge status={rec.status} />
            </TableCell>
            <TableCell className="text-right">
              <RecruiterActions
                status={rec.status}
                onView={() => onView(rec.id)}
                onAction={(currentStatus) =>
                  onStatusAction(rec.id, currentStatus)
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
