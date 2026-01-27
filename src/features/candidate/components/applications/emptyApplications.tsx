import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/shadcn/button";
import { Briefcase, ArrowRight } from "lucide-react";

export default function EmptyApplications() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-20 px-4 animate-in fade-in duration-500">
      {/* Icon Area */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-blue-50 rounded-full blur-xl opacity-50" />
        <div className="relative h-20 w-20 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm rotate-3">
          <Briefcase className="h-10 w-10 text-blue-600" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        No applications yet
      </h2>

      {/* Description */}
      <p className="max-w-sm text-slate-500 text-[15px] leading-relaxed mb-8">
        You haven’t applied to any jobs yet. Start exploring opportunities and
        apply to roles that match your skills.
      </p>

      {/* Action */}
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 h-11 rounded-lg flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
        onClick={() => navigate("/jobs")}
      >
        Browse Opportunities
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}

