import { Card, CardContent } from "@/components/ui/shadcn/card"
import { Button } from "@/components/ui/shadcn/button"
import { useNavigate } from "react-router-dom"
import { InterviewStatusBadge } from "./InterviewStatusBadge"
import type{ CandidateInterview } from "../../types/interview.types"

export function InterviewListCard({
  interview,
}: {
  interview: CandidateInterview
}) {
  const navigate = useNavigate()

  const startTime = new Date(interview.startTime).toLocaleString()

  return (
    <Card>
      <CardContent className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">
              {interview.roundType} Interview
            </h3>
            <p className="text-sm text-muted-foreground">
              {interview.jobTitle} @ {interview.companyName}
            </p>
          </div>
          <InterviewStatusBadge status={interview.status} />
        </div>

        <div className="text-sm grid grid-cols-2 gap-2">
          <p><strong>Round:</strong> {interview.roundNumber}</p>
          <p><strong>Mode:</strong> {interview.mode}</p>
          <p><strong>Date:</strong> {startTime}</p>
        </div>

        <div className="flex gap-2 pt-2">
          {interview.status === "Scheduled" && (
            <Button size="sm">Join</Button>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() =>
              navigate(`/interviews/${interview._id}`)
            }
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
