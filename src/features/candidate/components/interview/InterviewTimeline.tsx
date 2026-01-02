import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Clock, Calendar, MessageSquare } from "lucide-react";
import {type InterviewTimelineItem,} from "../../types/interview.types";
import { InterviewStatusBadge } from "./InterviewStatusBadge";
import { formatDateTime, formatDuration } from "@/lib/utils";

interface InterviewTimelineProps {
  timeline: InterviewTimelineItem[];
}

export  function InterviewTimeline({
  timeline,
}: InterviewTimelineProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Interview Timeline
        </h2>
        <p className="text-gray-600">
          Track your interview progress and upcoming rounds
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-[27px] top-8 bottom-0 w-0.5 bg-gradient-to-b from-blue-200 via-gray-200 to-gray-100" />

        <div className="space-y-6">
          {timeline.map((item) => {
            const isCompleted = item.status === "Completed";
            const isScheduled = item.status === "Scheduled";
            const isCancelled = item.status === "Cancelled";

            const duration = formatDuration(
              item.startTime,
              item.endTime
            );

            return (
              <div key={item.id} className="relative">
                {/* Timeline Dot */}
                <div
                  className={`absolute left-[17px] top-6 w-6 h-6 rounded-full border-4 border-white z-10 ${
                    isCompleted
                      ? "bg-green-500"
                      : isScheduled
                      ? "bg-blue-500 animate-pulse"
                      : isCancelled
                      ? "bg-red-500"
                      : "bg-gray-300"
                  }`}
                />

                {/* Card */}
                <div className="ml-16">
                  <Card
                    className={`transition-all hover:shadow-lg ${
                      isCompleted
                        ? "border-green-200 bg-green-50/30"
                        : isScheduled
                        ? "border-blue-200 bg-blue-50/30"
                        : "border-gray-200"
                    }`}
                  >
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            Round {item.roundNumber} – {item.roundType}
                          </h3>

                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="inline-flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-blue-500" />
                              {item.mode}
                            </span>

                            {duration && (
                              <>
                                <span>•</span>
                                <span>{duration}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <InterviewStatusBadge status={item.status} />
                      </div>

                      {/* Time */}
                      {item.startTime && (
                        <div className="flex gap-3 mb-4">
                          <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Scheduled Time
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDateTime(item.startTime)}
                            </p>
                          </div>
                        </div>
                      )}

                      {isCompleted && item.endTime && (
                        <div className="flex gap-3 mb-4">
                          <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              Completed At
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatDateTime(item.endTime)}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Status History */}
                      {item.statusHistory?.length ? (
                        <div className="border-t pt-4 mt-4">
                          <p className="text-xs font-medium text-gray-700 mb-3 uppercase tracking-wide">
                            Activity Log
                          </p>

                          <div className="space-y-2">
                            {item.statusHistory.map((history, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-sm"
                              >
                                <div
                                  className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                                    history.status === "Completed"
                                      ? "bg-green-500"
                                      : history.status === "Scheduled"
                                      ? "bg-blue-500"
                                      : "bg-gray-400"
                                  }`}
                                />

                                <div className="flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-medium text-gray-900">
                                      {history.status}
                                    </span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-gray-600">
                                      {formatDateTime(history.changedAt)}
                                    </span>
                                  </div>

                                  {history.notes && (
                                    <p className="text-gray-600 mt-1 flex items-center gap-1">
                                      <MessageSquare className="w-3 h-3" />
                                      {history.notes}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
