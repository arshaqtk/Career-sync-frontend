import { Card } from "@/components/ui/shadcn/card";
import { Clock, Calendar, MessageSquare, Video, MapPin, User2 } from "lucide-react";
import { type InterviewTimelineItem } from "../../types/interview.types";
import { InterviewStatusBadge } from "./InterviewStatusBadge";
import { formatDateTime, formatDuration } from "@/lib/utils";

interface InterviewTimelineProps {
  timeline: InterviewTimelineItem[];
}

export function InterviewTimeline({ timeline }: InterviewTimelineProps) {
  return (
    <Card className="border-border shadow-sm overflow-hidden bg-card">
      <div className="p-6 border-b border-border/50 flex items-center justify-between">
        <div>
          <h2 className="text-[17px] font-bold text-foreground">
            Interview Journey
          </h2>
          <p className="text-[13px] text-muted-foreground font-medium">
            Historical and upcoming rounds for this application
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[15px] top-6 bottom-0 w-0.5 bg-muted" />

          <div className="space-y-10">
            {timeline.map((item) => {
              const isCompleted = item.status === "Completed";
              const isScheduled = item.status === "Scheduled";
              const isCancelled = item.status === "Cancelled";

              const duration = formatDuration(item.startTime, item.endTime);

              return (
                <div key={item.id} className="relative pl-10">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-0 top-1 w-[32px] h-[32px] rounded-xl border-4 border-white flex items-center justify-center z-10 shadow-sm ${isCompleted
                      ? "bg-emerald-500 text-white"
                      : isScheduled
                        ? "bg-blue-600 text-white animate-pulse"
                        : isCancelled
                          ? "bg-rose-500 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                  >
                    <User2 size={14} className="font-bold" />
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Content Header */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div>
                        <h3 className="text-[16px] font-bold text-foreground mb-1">
                          Round {item.roundNumber}: {item.roundType}
                        </h3>
                        <div className="flex items-center gap-3 text-[13px] font-medium text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            {item.mode === "Offline" ? <MapPin size={14} /> : <Video size={14} />}
                            {item.mode}
                          </span>
                          {duration && (
                            <>
                              <span className="text-muted-foreground/50">•</span>
                              <span className="flex items-center gap-1.5 underline decoration-slate-200 underline-offset-4">
                                <Clock size={14} />
                                {duration}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <InterviewStatusBadge status={item.status} />
                    </div>

                    {/* Schedule Block */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.startTime && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50/80 border border-border/50">
                          <Calendar className="h-4 w-4 text-muted-foreground/70" />
                          <div>
                            <p className="text-[10px] font-bold text-muted-foreground/70 uppercase tracking-wider">
                              {isCompleted ? "Held On" : "Scheduled For"}
                            </p>
                            <p className="text-[13px] font-bold text-foreground/80">
                              {formatDateTime(item.startTime)}
                            </p>
                          </div>
                        </div>
                      )}

                      {isCompleted && item.endTime && (
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/30 border border-emerald-100/50">
                          <Clock className="h-4 w-4 text-emerald-400" />
                          <div>
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                              Duration Recorded
                            </p>
                            <p className="text-[13px] font-bold text-emerald-700">
                              Ended at {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Activity Feed */}
                    {item.statusHistory?.length ? (
                      <div className="mt-2 space-y-3 pl-4 border-l-2 border-slate-50">
                        {item.statusHistory.map((history, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${history.status === "Completed" ? "bg-emerald-500" :
                              history.status === "Scheduled" ? "bg-blue-600" : "bg-slate-300"
                              }`} />
                            <div className="flex-1">
                              <p className="text-[13px] text-muted-foreground">
                                <span className="font-bold text-foreground">{history.status}</span>
                                <span className="mx-2 text-muted-foreground/50">•</span>
                                <span className="text-muted-foreground/70 font-medium">{formatDateTime(history.changedAt)}</span>
                              </p>
                              {history.notes && (
                                <p className="mt-1 text-[13px] text-muted-foreground italic bg-muted/50 p-2 rounded-lg border border-border/50/50 flex gap-2 items-start">
                                  <MessageSquare size={14} className="shrink-0 mt-0.5" />
                                  {history.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
