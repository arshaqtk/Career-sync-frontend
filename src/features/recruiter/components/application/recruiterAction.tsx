import { Button } from "@/components/ui/shadcn/button";
import { useUpdateApplicantStatus } from "../../hooks/useUpdateApplicantStatus";
import type { ApplicationStatus } from "../../types/applicant.types";

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
        onClick={() => updateStatus("SHORTLISTED")}
        disabled={currentStatus === "SHORTLISTED" || isPending}
      >
        Shortlist
      </Button>

      {/* Reject */}
      <Button
        variant="destructive"
        onClick={() => updateStatus("REJECTED")}
        disabled={currentStatus === "REJECTED" || isPending}
      >
        Reject
      </Button>

      {/* Interview */}
      <Button
        variant="outline"
        onClick={() => updateStatus("INTERVIEW")}
        disabled={currentStatus === "INTERVIEW" || isPending}
      >
        Move to Interview
      </Button>
    </div>
  );
}
