import { Button } from "@/components/ui/shadcn/button"
import type { CandidateInterview } from "../../types/interview.types"
import { MapPin, CalendarClock } from "lucide-react"

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

  // ✅ Status-based messages
  if (interview.status === "Completed") {
    return <p className="text-green-600 font-medium">Interview completed</p>
  }

  if (interview.status === "Cancelled") {
    return <p className="text-red-600 font-medium">Interview cancelled</p>
  }

  // ✅ OFFLINE interview UI
  if (interview.mode === "Offline") {
    return (
      <div className="border rounded-lg p-4 bg-yellow-50 space-y-2">
        <div className="flex items-center gap-2 text-yellow-700 font-semibold">
          <MapPin size={18} />
          Offline Interview
        </div>

        <p className="text-sm text-gray-700">
          Please attend the interview at the specified location.
        </p>

        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <CalendarClock size={16} />
            <span>
              {start.toLocaleDateString()} •{" "}
              {start.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Optional – show location if available */}
          {interview.location && (
            <p>
              <span className="font-medium">Location:</span>{" "}
              {interview.location}
            </p>
          )}
        </div>
      </div>
    )
  }

  // ✅ ONLINE (Coding / Video) interview
  return (
    <Button disabled={!canJoin} className="w-full" onClick={() =>
                          canJoin &&
                          window.open(interview.meetingLink!, "_blank")
                        }>
  
    </Button>
  )
}
