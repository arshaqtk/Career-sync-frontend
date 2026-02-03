import { Card } from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";
import { format } from "date-fns";
import { Calendar, Clock, MessageSquare, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

import type { Interview } from "../../types/interview.type";

interface InterviewTimelineProps {
  interviews: Interview[];
}

export function InterviewTimeline({ interviews }: InterviewTimelineProps) {
  if (!interviews || interviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="p-4 bg-gray-50 rounded-full mb-4">
          <Calendar className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-sm font-medium text-gray-500">No interview timeline available.</p>
      </div>
    );
  }

  const sortedInterviews = [...interviews].sort(
    (a, b) => a.roundNumber - b.roundNumber
  );

  return (
    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
      {sortedInterviews.map((interview) => (
        <InterviewRound key={interview._id} interview={interview} />
      ))}
    </div>
  );
}

//----------------------------------------------------------------------------------

function InterviewRound({ interview }: { interview: Interview }) {
  const {
    roundNumber,
    roundType,
    status,
    startTime,
    endTime,
    statusHistory = [],
    notes,
  } = interview;

  return (
    <div className="relative pl-12">
      {/* Timeline marker */}
      <div className="absolute left-0 mt-1.5 flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm ring-8 ring-white">
        <span className="text-xs font-bold text-gray-500">{roundNumber}</span>
      </div>

      <Card className="border border-gray-200 shadow-sm overflow-hidden bg-white">
        <div className="p-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-gray-900">
                {roundType}
              </h3>

              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{format(new Date(startTime), "dd MMM yyyy")}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{format(new Date(startTime), "hh:mm a")} → {format(new Date(endTime), "hh:mm a")}</span>
                </div>
              </div>
            </div>

            <StatusBadge status={status} />
          </div>

          {/* Timeline Updates */}
          <div className="mt-6 space-y-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Status Updates</p>
            <div className="space-y-4">
              {statusHistory.length > 0 ? (
                statusHistory.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">
                          {item.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          {format(new Date(item.changedAt), "dd MMM, hh:mm a")}
                        </span>
                      </div>
                      {item.note && (
                        <div className="flex items-start gap-2 p-2 bg-gray-50 rounded-md border border-gray-100 italic text-gray-600 text-sm">
                          <MessageSquare className="h-3.5 w-3.5 mt-0.5 shrink-0 text-gray-400" />
                          <p>{item.note}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic">No status updates recorded.</p>
              )}
            </div>
          </div>

          {/* Optional Round Notes */}
          {notes && (
            <div className="mt-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Round Notes</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{notes}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}


/* Status Badge */

function StatusBadge({ status }: { status: Interview["status"] }) {
  const config = {
    "Scheduled": "border-blue-200 text-blue-700 bg-blue-50",
    "Rescheduled": "border-blue-200 text-blue-700 bg-blue-50",
    "Completed": "border-gray-200 text-gray-700 bg-gray-50",
    "Selected": "border-green-200 text-green-700 bg-green-50",
    "Rejected": "border-red-200 text-red-700 bg-red-50",
    "Cancelled": "border-orange-200 text-orange-700 bg-orange-50",
  }[status] || "border-gray-200 text-gray-700 bg-gray-50";

  const Icon = {
    "Selected": CheckCircle2,
    "Rejected": XCircle,
    "Scheduled": Clock,
  }[status as string] || AlertCircle;

  return (
    <Badge variant="outline" className={`px-2.5 py-1 gap-1.5 font-medium ${config}`}>
      <Icon className="h-3.5 w-3.5" />
      {status}
    </Badge>
  );
}
// function StatusBadge({ status }: { status: Interview["status"] }) {
//   const variant =
//     status === "Completed"
//       ? "secondary"
//       : status === "Selected"
//       ? "default"
//       : status === "Rejected"
//       ? "destructive"
//       : "outline";

//   return <Badge variant={variant}>{status}</Badge>;
// }