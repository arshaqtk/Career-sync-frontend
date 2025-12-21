import { Card, CardContent } from "@/components/ui/shadcn/card";
import type{ InterviewDetails } from "../../../types/interview-details.types";

export function InterviewOverview({
  interview,
}: {
  interview: InterviewDetails;
}) {
  return (
    <Card>
      <CardContent className="space-y-2 p-4 text-sm">
        <p><b>Email:</b> {interview.candidate.email}</p>
        <p><b>Mode:</b> {interview.mode||"Not Scheduled"}</p>
        <p><b>Status:</b> {interview.status}</p>
      </CardContent>
    </Card>
  );
}
