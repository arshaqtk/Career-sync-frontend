import { Badge } from "@/components/ui/shadcn/badge";

export default function ApplicationStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "Interview": "bg-blue-100 text-blue-700",
    "Shortlisted": "bg-green-100 text-green-700",
    "Pending": "bg-purple-100 text-purple-700",
    "Rejected": "bg-red-100 text-red-700",
  };

  return (
    <Badge className={`${colors[status]} px-3 rounded-full`}>
      {status}
    </Badge>
  );
}
