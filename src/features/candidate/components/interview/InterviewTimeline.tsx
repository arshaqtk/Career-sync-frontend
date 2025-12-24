import { Card, CardContent } from "@/components/ui/shadcn/card"
import type { InterviewTimelineItem } from "../../types/interview.types"
import { InterviewStatusBadge } from "./InterviewStatusBadge"
import { cn } from "@/lib/utils"

export function InterviewTimeline({
  timeline,
}: {
  timeline: InterviewTimelineItem[]
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">
          Interview Timeline
        </h3>

        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-[14px] top-0 h-full w-px bg-border" />

          <div className="space-y-8">
            {timeline.map((item, index) => {
              const isCompleted = item.status === "Completed"
              const isScheduled = item.status === "Scheduled"

              return (
                <div
                  key={item._id ?? index}
                  className="relative flex items-start gap-6"
                >
                  {/* dot */}
                  <div
                    className={cn(
                      "relative z-10 mt-1 h-3.5 w-3.5 rounded-full border-2",
                      isCompleted &&
                        "bg-green-500 border-green-500",
                      isScheduled &&
                        "bg-blue-500 border-blue-500",
                      !isCompleted &&
                        !isScheduled &&
                        "bg-background border-muted-foreground"
                    )}
                  />

                  {/* content */}
                  <div className="flex w-full justify-between items-start">
                    <div>
                      <p className="font-medium">
                        Round {item.roundNumber} – {item.roundType}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.startTime
                          ? new Date(item.startTime).toLocaleString()
                          : "Not scheduled"}
                      </p>
                    </div>

                    <InterviewStatusBadge status={item.status} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
