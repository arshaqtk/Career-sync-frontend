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
        <TableHead>Type</TableHead>
        <TableHead>Round</TableHead>
        <TableHead>Status</TableHead>
        <TableHead />
      </TableRow>
    </TableHeader>
  );
}
