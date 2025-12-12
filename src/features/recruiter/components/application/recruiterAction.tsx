import { Button } from "@/components/ui/shadcn/button";
import { useUpdateApplicantStatus } from "../hooks/useUpdateApplicantStatus";

export function RecruiterActions({ applicationId, currentStatus }: any) {
  const { mutate } = useUpdateApplicantStatus();

  return (
    <div className="flex gap-3">
      <Button
        onClick={() => mutate({ id: applicationId, status: "SHORTLISTED" })}
        disabled={currentStatus === "SHORTLISTED"}
      >
        Shortlist
      </Button>

      <Button
        variant="destructive"
        onClick={() => mutate({ id: applicationId, status: "REJECTED" })}
        disabled={currentStatus === "REJECTED"}
      >
        Reject
      </Button>

      <Button
        variant="outline"
        onClick={() => mutate({ id: applicationId, status: "INTERVIEW" })}
        disabled={currentStatus === "INTERVIEW"}
      >
        Move to Interview
      </Button>
    </div>
  );
}
