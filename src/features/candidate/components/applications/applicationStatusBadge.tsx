import { Badge } from "@/components/ui/shadcn/badge";

export default function ApplicationStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "Interview Scheduled": "bg-blue-100 text-blue-700",
    "Shortlisted": "bg-green-100 text-green-700",
    "Under Review": "bg-yellow-100 text-yellow-700",
    "Applied": "bg-purple-100 text-purple-700",
    "Not Selected": "bg-red-100 text-red-700",
  };

  return (
    <Badge className={`${colors[status]} px-3 rounded-full`}>
      {status}
    </Badge>
  );
}
