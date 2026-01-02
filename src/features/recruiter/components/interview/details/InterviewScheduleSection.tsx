import { Card, CardContent } from "@/components/ui/shadcn/card"
import { Button } from "@/components/ui/shadcn/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/shadcn/tooltip"
import { MapPin } from "lucide-react"

import { useInterviewScheduleModalStore } from "../../../store/interviewScheduleModal.store"
import type { ScheduleInterviewPayload } from "../../../types/scheduledInterview.types"

export function InterviewScheduleSection({
  interview,
}: {
  interview: ScheduleInterviewPayload
}) {
  const { openModal } = useInterviewScheduleModalStore()

  const lastStatus =
    interview.statusHistory?.[interview.statusHistory.length - 1]?.status

  const now = new Date()
  const start = interview.startTime ? new Date(interview.startTime) : null
  const end = interview.endTime ? new Date(interview.endTime) : null

  const isOffline = interview.mode === "Offline"

  const canJoin =
    !isOffline &&
    start &&
    end &&
    now >= start &&
    now <= end &&
    Boolean(interview.meetingLink)

  const tooltipMessage = (() => {
    if (isOffline) return "This is an offline interview"
    if (!interview.meetingLink) return "Meeting link not available"
    if (!start || !end) return "Interview time not scheduled"
    if (now < start) return "You can join when the interview starts"
    if (now > end) return "Interview has already ended"
    return ""
  })()

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-medium">Interview</h3>

        {lastStatus === "Scheduled" || lastStatus === "Rescheduled" ||lastStatus==="Cancelled" ? (
          <>
            <p className="text-sm text-muted-foreground">
              {start?.toLocaleString()} – {end?.toLocaleString()}
            </p>

            <div className="flex gap-2 items-center">
              {/* ✅ OFFLINE UI */}
              {isOffline ? (
                <div className="flex items-center gap-2 text-yellow-700 text-sm font-medium">
                  <MapPin size={16} />
                  Offline Interview
                  {interview.location}
                </div>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <Button
                          disabled={!canJoin}
                          onClick={() =>
                            canJoin &&
                            window.open(interview.meetingLink!, "_blank")
                          }
                        >
                          Join Interview
                        </Button>
                      </span>
                    </TooltipTrigger>
                    {!canJoin && (
                      <TooltipContent>
                        <p>{tooltipMessage}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                </TooltipProvider>
              )}

              {/* ✅ Reschedule always allowed */}
              <Button
                variant="outline"
                onClick={() =>
                  openModal({
                    mode: "reschedule",
                    interview,
                  })
                }
              >
                Reschedule
              </Button>
            </div>
          </>
        ) : (
          <Button onClick={() => openModal({ mode: "schedule" })}>
            Schedule Interview
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
