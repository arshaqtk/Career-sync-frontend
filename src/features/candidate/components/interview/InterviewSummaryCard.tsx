import { Card } from "@/components/ui/shadcn/card"
import { InterviewStatusBadge } from "./InterviewStatusBadge"
import type { CandidateInterview } from "../../types/interview.types"
import { Building2, Calendar, Video, MapPin, Clock } from "lucide-react"

export function InterviewSummaryCard({
  interview,
}: {
  interview: CandidateInterview
}) {
  const start = new Date(interview.startTime)

  return (
    <Card className="border-border shadow-sm overflow-hidden bg-card">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-blue-600 font-bold px-2 py-0.5 bg-blue-50 rounded text-xs uppercase tracking-wide">
                {interview.mode} ROUND
              </span>
            </div>
            <h1 className="text-2xl font-bold text-foreground leading-tight">
              {interview.roundType} Interview
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-blue-600 font-bold text-lg">
                {interview.jobTitle}
              </span>
              <span className="text-muted-foreground/50">|</span>
              <span className="text-muted-foreground font-semibold flex items-center gap-1.5">
                <Building2 className="h-5 w-5 text-muted-foreground/70" />
                {interview.companyName}
              </span>
            </div>
          </div>
          <InterviewStatusBadge status={interview.status} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted/50 text-muted-foreground">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">
                Round Number
              </p>
              <p className="text-[14px] font-bold text-foreground/80">
                Round {interview.roundNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted/50 text-muted-foreground">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">
                Scheduled Date
              </p>
              <p className="text-[14px] font-bold text-foreground/80">
                {start.toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted/50 text-muted-foreground">
              {interview.mode === "Offline" ? (
                <MapPin className="h-4 w-4" />
              ) : (
                <Video className="h-4 w-4" />
              )}
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">
                Interview Mode
              </p>
              <p className="text-[14px] font-bold text-foreground/80">
                {interview.mode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted/50 text-muted-foreground">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground/70 uppercase tracking-wider">
                Time & Duration
              </p>
              <p className="text-[14px] font-bold text-foreground/80">
                {start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

