import { Card, CardContent } from "@/components/ui/shadcn/card"
import { Button } from "@/components/ui/shadcn/button"
import { useNavigate } from "react-router-dom"
import { InterviewStatusBadge } from "./InterviewStatusBadge"
import type { CandidateInterview } from "../../types/interview.types"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip"

export function InterviewListCard({
  interview,
}: {
  interview: CandidateInterview
}) {
  const navigate = useNavigate()

  const startTime = interview.startTime
    ? new Date(interview.startTime).toLocaleString()
    : "-"

  // ✅ status & time checks
  // const lastStatus =
  //   interview.statusHistory?.[
  //     interview.statusHistory.length - 1
  //   ]?.status

  const now = new Date()
  const start = interview.startTime
    ? new Date(interview.startTime)
    : null
  const end = interview.endTime
    ? new Date(interview.endTime)
    : null

 const canJoin =
 interview.status!="Cancelled"&&
 start&&end&&
  Boolean(interview.meetingLink) &&
  Boolean(start) &&
  Boolean(end) &&
  now >= start &&
  now <= end;

  const tooltipMessage = (() => {
    if(interview.status=="Cancelled")
      return "Interview is cancelled"
    if (!interview.meetingLink)
      return "Meeting link not available"
    if (!start || !end)
      return "Interview time not scheduled"
    if (now < start)
      return "You can join when the interview starts"
    if (now > end)
      return "Interview has already ended"
    return ""
  })()

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
          <p>
            <strong>Round:</strong> {interview.roundNumber}
          </p>
          <p>
            <strong>Mode:</strong> {interview.mode}
          </p>
          <p>
            <strong>Date:</strong> {startTime}
          </p>
        </div>

        <div className="flex gap-2 pt-2">
          <Tooltip>
  <TooltipTrigger asChild>
    <span>
      <Button
            size="sm"
            disabled={!canJoin}
            title={!canJoin ? tooltipMessage : undefined}
            onClick={() =>
              canJoin &&
              window.open(interview.meetingLink!, "_blank")
            }
          >
            Join
          </Button>
    </span>
  </TooltipTrigger>
  <TooltipContent>{tooltipMessage}</TooltipContent>
</Tooltip>

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
