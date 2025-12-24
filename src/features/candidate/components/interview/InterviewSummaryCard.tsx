import { Card, CardContent } from "@/components/ui/shadcn/card"
import { InterviewStatusBadge } from "./InterviewStatusBadge"
import type{ CandidateInterview } from "../../types/interview.types"

export function InterviewSummaryCard({
  interview,
}: {
  interview: CandidateInterview
}) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">
            {interview.roundType} Interview
          </h2>
          <InterviewStatusBadge status={interview.status} />
        </div>

        <p className="text-muted-foreground">
          {interview.jobTitle} @ {interview.companyName}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><strong>Round:</strong> {interview.roundNumber}</p>
          <p><strong>Mode:</strong> {interview.mode}</p>
          <p><strong>Date:</strong> {new Date(interview.startTime).toLocaleString()}</p>
          <p><strong>Duration:</strong> 45 mins</p>
        </div>
      </CardContent>
    </Card>
  )
}
