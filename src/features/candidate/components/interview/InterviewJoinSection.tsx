import { Button } from "@/components/ui/shadcn/button"
import type{ CandidateInterview } from "../../types/interview.types"

export function InterviewJoinSection({
  interview,
}: {
  interview: CandidateInterview
}) {
  const now = new Date()
  const start = new Date(interview.startTime)

  const canJoin =
    interview.status === "Scheduled" &&
    start.getTime() - now.getTime() <= 10 * 60 * 1000

  if (interview.status === "Completed") {
    return <p className="text-green-600">Interview completed</p>
  }

  if (interview.status === "Cancelled") {
    return <p className="text-red-600">Interview cancelled</p>
  }

  return (
    <Button disabled={!canJoin} className="w-full">
      {interview.mode === "Coding"
        ? "Join Coding Interview"
        : "Join Video Interview"}
    </Button>
  )
}
