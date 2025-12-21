import type{ InterviewDetails } from "../../../types/interview-details.types";
import { InterviewStatusBadge } from "../list/InterviewStatusBadge";

export function InterviewHeader({
  interview,
}: {
  interview: InterviewDetails;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold">
          {interview.candidate.name}
        </h2>
        <p className="text-sm text-muted-foreground">
          {interview.job.title} • {interview.roundType}
        </p>
      </div>

      <InterviewStatusBadge status={interview.status} />
    </div>
  );
}
