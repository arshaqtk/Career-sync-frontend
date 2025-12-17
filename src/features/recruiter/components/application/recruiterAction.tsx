import { Button } from "@/components/ui/shadcn/button";
import { useUpdateApplicantStatus } from "../../hooks/useUpdateApplicantStatus";
import type { ApplicationStatus } from "../../types/applicationStatus.types";

interface RecruiterActionsProps {
  applicationId: string;
  currentStatus: ApplicationStatus;
}

export function RecruiterActions({ applicationId, currentStatus }: RecruiterActionsProps) {
  const { mutate, isPending } = useUpdateApplicantStatus();

  const updateStatus = (status: ApplicationStatus) => {
    mutate({ applicationId, status });
  };

  return (
    <div className="flex gap-3">
      {/* Shortlist */}
      <Button
        onClick={() => updateStatus("Shortlisted")}
        disabled={currentStatus === "Shortlisted" || isPending}
      >
        Shortlist
      </Button>

      {/* Reject */}
      <Button
        variant="destructive"
        onClick={() => updateStatus("Rejected")}
        disabled={currentStatus === "Rejected" || isPending}
      >
        Reject
      </Button>

      {/* Interview */}
      <Button
        variant="outline"
        onClick={() => updateStatus("Interview")}
        disabled={currentStatus === "Interview" || isPending}
      >
        Move to Interview
      </Button>
    </div>
  );
}
