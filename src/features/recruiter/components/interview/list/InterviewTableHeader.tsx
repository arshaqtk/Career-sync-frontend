import {
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/shadcn/table";

export function InterviewTableHeader() {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50 border-b border-gray-200">
        <TableHead className="font-semibold text-gray-700 h-12">No</TableHead>
        <TableHead className="font-semibold text-gray-700 h-12">Candidate</TableHead>
        <TableHead className="font-semibold text-gray-700">Job</TableHead>
        <TableHead className="font-semibold text-gray-700">Type</TableHead>
        <TableHead className="font-semibold text-gray-700">Round</TableHead>
        <TableHead className="font-semibold text-gray-700">Status</TableHead>
        <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
