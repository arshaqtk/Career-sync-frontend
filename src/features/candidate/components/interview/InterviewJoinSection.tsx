import { Button } from "@/components/ui/shadcn/button"
import type { CandidateInterview } from "../../types/interview.types"
import { MapPin, CalendarClock, Video, ExternalLink } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/shadcn/tooltip"

export function InterviewJoinSection({
  interview,
}: {
  interview: CandidateInterview
}) {
  const start = new Date(interview.startTime)
  const end = interview.endTime ? new Date(interview.endTime) : null
  const now = new Date()

  const isOffline = interview.mode === "Offline"
  const canJoin =
    !isOffline &&
    interview.status === "Scheduled" &&
    Boolean(interview.meetingLink) &&
    Boolean(end) &&
    now <= end!

  const tooltipMessage = (() => {
    if (interview.status === "Cancelled") return "Interview is cancelled"
    if (isOffline) return "This is an offline interview"
    if (!interview.meetingLink) return "Meeting link not available"
    if (now > end!) return "Interview has already ended"
    return ""
  })()

  if (interview.status === "Completed") {
    return (
      <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-700 font-bold text-center">
        Interview Completed
      </div>
    )
  }

  if (interview.status === "Cancelled") {
    return (
      <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 font-bold text-center">
        Interview Cancelled
      </div>
    )
  }

  if (interview.mode === "Offline") {
    return (
      <div className="border border-amber-200 rounded-xl p-5 bg-amber-50/50 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-amber-700 font-bold">
          <MapPin size={20} />
          In-Person Interview
        </div>

        <p className="text-[13px] text-slate-600 leading-relaxed">
          Please attend the interview at the specified location. We recommend
          arriving 10 minutes before the scheduled time.
        </p>

        <div className="pt-3 border-t border-amber-100 space-y-2">
          <div className="flex items-center gap-2 text-[13px] font-bold text-slate-700">
            <CalendarClock size={16} className="text-amber-600" />
            <span>
              {start.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                weekday: "short",
              })} • {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>

          {interview.location && (
            <div className="flex items-start gap-2 text-[13px] font-medium text-slate-600">
              <MapPin size={16} className="text-amber-600 mt-0.5 shrink-0" />
              <span>{interview.location}</span>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="border border-blue-200 rounded-xl p-5 bg-blue-50/50 space-y-4 shadow-sm">
      <div className="flex items-center gap-2 text-blue-700 font-bold">
        <Video size={20} />
        Online Interview
      </div>
      <p className="text-[13px] text-slate-600 leading-relaxed">
        This interview will be held via a video call. Click the button below to join the meeting.
      </p>
      <Tooltip>
        <TooltipTrigger asChild>
          <span>
            <Button
              disabled={!canJoin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded-lg shadow-sm flex items-center justify-center gap-2"
              onClick={() => canJoin && window.open(interview.meetingLink!, "_blank")}
            >
              <ExternalLink size={18} />
              Join Meeting
            </Button>
          </span>
        </TooltipTrigger>
        {!canJoin && tooltipMessage && (
          <TooltipContent>{tooltipMessage}</TooltipContent>
        )}
      </Tooltip>
      
    </div>
  )
}

