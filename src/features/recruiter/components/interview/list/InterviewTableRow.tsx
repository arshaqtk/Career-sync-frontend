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
}: {
  interview: InterviewListItem;
}) {
  const navigate = useNavigate();

  return (
    <TableRow>
      <TableCell>{interview.candidateName}</TableCell>
      <TableCell>{interview.jobTitle}</TableCell>
      <TableCell>{interview.roundType}</TableCell>

      <TableCell>
        {interview.startTime
          ? new Date(interview.startTime).toLocaleString()
          : "Not scheduled"}
      </TableCell>

      {/* <TableCell>{interview.mode}</TableCell> */}

      <TableCell>
        <InterviewStatusBadge status={interview.status} />
      </TableCell>

      <TableCell>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            navigate(`/recruiter/interviews/${interview.id}`)
          }
        >
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
