import {
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/shadcn/table";

export function InterviewTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Candidate</TableHead>
        <TableHead>Job</TableHead>
        <TableHead>Round</TableHead>
        <TableHead>Date & Time</TableHead>
        <TableHead>Status</TableHead>
        <TableHead />
      </TableRow>
    </TableHeader>
  );
}
