import {
  TableRow,
  TableCell,
} from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { useNavigate } from "react-router-dom";
import type{ InterviewListItem } from "../../../types/interview.type";
import { InterviewStatusBadge } from "./InterviewStatusBadge";

export function InterviewTableRow({
  interview,
  index=0
}: {
  interview: InterviewListItem;
  index?: number
}) {
  const navigate = useNavigate();

   return (
    <TableRow className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <TableCell className="py-4">
        <span className="font-semibold text-gray-950">{index}</span>
      </TableCell>
      <TableCell className="py-4">
        <span className="font-semibold text-gray-900">{interview.candidateName}</span>
      </TableCell>

      <TableCell>
        <span className="text-sm font-medium text-gray-700">{interview.jobTitle}</span>
      </TableCell>

      <TableCell>
        <span className="text-sm text-gray-600">{interview.roundType}</span>
      </TableCell>

      <TableCell>
        <span className="text-sm font-medium text-gray-700">Round {interview.roundNumber}</span>
      </TableCell>

      <TableCell>
        <InterviewStatusBadge status={interview.status} />
      </TableCell>

      <TableCell className="text-right">
        <Button
          variant="outline"
          size="sm"
          className="h-8"
          onClick={() => navigate(`/recruiter/interviews/${interview.id}`)}
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
