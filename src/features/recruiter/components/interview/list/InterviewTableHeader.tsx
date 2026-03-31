import {
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/shadcn/table";

export function InterviewTableHeader() {
  return (
    <TableHeader>
      <TableRow className="border-b border-border">
        <TableHead className="font-bold text-foreground/70 h-12 uppercase text-xs tracking-wider">No</TableHead>
        <TableHead className="font-bold text-foreground/70 h-12 uppercase text-xs tracking-wider">Candidate</TableHead>
        <TableHead className="font-bold text-foreground/70 uppercase text-xs tracking-wider">Job</TableHead>
        <TableHead className="font-bold text-foreground/70 uppercase text-xs tracking-wider">Type</TableHead>
        <TableHead className="font-bold text-foreground/70 uppercase text-xs tracking-wider">Round</TableHead>
        <TableHead className="font-bold text-foreground/70 uppercase text-xs tracking-wider">Status</TableHead>
        <TableHead className="text-right font-bold text-foreground/70 uppercase text-xs tracking-wider">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
}
