import {
  Table,
  TableBody,
} from "@/components/ui/shadcn/table";
import type{ InterviewListItem } from "../../types/interview.type";
import { InterviewTableHeader } from "./InterviewTableHeader";
import { InterviewTableRow } from "./InterviewTableRow";
import { EmptyState } from "../shared/EmptyState";

export function InterviewTable({
  interviews,
  isLoading,
}: {
  interviews?: InterviewListItem[];
  isLoading: boolean;
}) {
  if (isLoading) return <p>Loading...</p>;

  if (!interviews?.length) {
    return <EmptyState message="No interviews found" />;
  }

  return (
    <Table>
      <InterviewTableHeader />
      <TableBody>
        {interviews.map((interview) => (
          <InterviewTableRow
            key={interview.id}
            interview={interview}
          />
        ))}
      </TableBody>
    </Table>
  );
}
