import { Button } from "@/components/ui/shadcn/button";
import { useUpdateApplicantStatus } from "../../hooks/useUpdateApplicantStatus";
import type { ApplicationStatus } from "../../types/applicationStatus.types";
import { useInterviewScheduleModalStore } from "../../store/interviewScheduleModal.store";

interface RecruiterActionsProps {
  applicationId: string;
  currentStatus: ApplicationStatus;
}

export function RecruiterActions({ applicationId, currentStatus }: RecruiterActionsProps) {
  const { mutate, isPending } = useUpdateApplicantStatus();
    const {openModal}=useInterviewScheduleModalStore()

  const updateStatus = (status: ApplicationStatus) => {
    mutate({ applicationId, status });
  };

  return (
    <div className="flex gap-3">
      {/* Shortlist */}
      <Button
        onClick={() => updateStatus("Shortlisted")}
        disabled={currentStatus === "Shortlisted" ||currentStatus==="Interview" || isPending}
      > 
        Shortlist
      </Button>

      {/* Reject */}
      <Button
        variant="destructive"
        onClick={() => updateStatus("Rejected")}
        disabled={currentStatus === "Rejected" ||currentStatus==="Interview"|| isPending}
      >
        Reject
      </Button>

      {/* Interview */}
      <Button
        variant="outline"
        onClick={() => openModal({mode:"schedule"})}
        disabled={currentStatus === "Interview" || isPending}
      >
        Move to Interview
      </Button>
    </div>
  );
}
