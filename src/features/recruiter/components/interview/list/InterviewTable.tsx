import {
  Table,
  TableBody,
} from "@/components/ui/shadcn/table";
import type{ InterviewListItem } from "../../../types/interview.type";
import { InterviewTableHeader } from "./InterviewTableHeader";
import { InterviewTableRow } from "./InterviewTableRow";
import { EmptyState } from "../../shared/EmptyState";
import { TableSkeleton } from "@/components/Loaders";

export function InterviewTable({
  interviews,
  isLoading,
}: {
  interviews?: InterviewListItem[];
  isLoading: boolean;
}) {
  if (isLoading) return <TableSkeleton/>

  if (!interviews?.length) {
    return <EmptyState message="No interviews found" />;
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm overflow-hidden">
      <Table>
        <InterviewTableHeader />
        <TableBody>
          {interviews.map((interview, index) => (
            <InterviewTableRow
              key={interview.id}
              interview={interview}
              index={index+1}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
