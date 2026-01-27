import { Badge } from "@/components/ui/shadcn/badge";

export default function ApplicationStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "Interview": "bg-blue-50 text-blue-700 border-blue-200",
    "Shortlisted": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Selected": "bg-green-50 text-green-700 border-green-200",
    "Pending": "bg-amber-50 text-amber-700 border-amber-200",
    "Rejected": "bg-rose-50 text-rose-700 border-rose-200",
  };

  const currentStyle = styles[status] || "bg-slate-50 text-slate-600 border-slate-200";

  return (
    <Badge className={`${currentStyle} px-2.5 py-0.5 rounded-md border text-[11px] font-bold uppercase tracking-wider`}>
      {status}
    </Badge>
  );
}

