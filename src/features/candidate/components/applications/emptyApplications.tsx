import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/shadcn/button";
import { Briefcase, ArrowRight } from "lucide-react";

export default function EmptyApplications() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      {/* Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Briefcase className="h-8 w-8 text-muted-foreground" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-foreground">
        No applications yet
      </h2>

      {/* Description */}
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        You haven’t applied to any jobs yet. Start exploring opportunities and
        apply to roles that match your skills.
      </p>

      {/* Action */}
      <Button
        className="mt-6 flex items-center gap-2"
        onClick={() => navigate("/jobs")}
      >
        Browse jobs
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
