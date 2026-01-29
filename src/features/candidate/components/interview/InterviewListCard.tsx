import { Card } from "@/components/ui/shadcn/card"
import { Button } from "@/components/ui/shadcn/button"
import { useNavigate } from "react-router-dom"
import { InterviewStatusBadge } from "./InterviewStatusBadge"
import type { CandidateInterview } from "../../types/interview.types"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/shadcn/tooltip"
import { MapPin, Building2, Calendar, Video, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function InterviewListCard({
  interview,
}: {
  interview: CandidateInterview
}) {
  const navigate = useNavigate()

  const start = interview.startTime ? new Date(interview.startTime) : null
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

  return (
    <Card
      onClick={() => navigate(`/interviews/${interview._id}`)}
      className="relative overflow-hidden cursor-pointer transition-all duration-200 border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md group"
    >
      {/* Side Indicator */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
      )} />

      <div className="p-5">
        <div className="flex justify-between items-start gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-[17px] font-bold text-blue-600 leading-tight group-hover:underline transition-colors">
              {interview.roundType} Interview • Round {interview.roundNumber}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[14px] font-bold text-slate-700">
                {interview.jobTitle}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-[14px] font-medium text-slate-500 flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {interview.companyName}
              </span>
            </div>
          </div>
          <InterviewStatusBadge status={interview.status} />
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-[13px] text-slate-500 font-medium mb-5">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            {start ? start.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit"
            }) : "-"}
          </span>

          <span className="flex items-center gap-2">
            {isOffline ? (
              <MapPin className="h-4 w-4 text-slate-400" />
            ) : (
              <Video className="h-4 w-4 text-slate-400" />
            )}
            {interview.mode}
          </span>
        </div>

        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex gap-3">
            {isOffline ? (
              <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-3 py-1.5 rounded-lg text-xs font-bold border border-amber-100">
                <MapPin size={14} />
                In-person required
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 font-bold h-9 px-5 shadow-sm"
                      disabled={!canJoin}
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(interview.meetingLink!, "_blank")
                      }}
                    >
                      Join Meeting
                    </Button>
                  </span>
                </TooltipTrigger>
                {!canJoin && tooltipMessage && (
                  <TooltipContent>{tooltipMessage}</TooltipContent>
                )}
              </Tooltip>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 font-bold hover:bg-blue-50 group/btn"
          >
            View Details
            <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

