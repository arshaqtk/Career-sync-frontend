import { Card } from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";
import { Separator } from "@/components/ui/shadcn/separator";
import { format } from "date-fns";

import type { Interview } from "../../types/interview.type";

interface InterviewTimelineProps {
  interviews: Interview[];
}

export function InterviewTimeline({ interviews }: InterviewTimelineProps) {
  if (!interviews || interviews.length === 0) {
    return (
      <Card className="p-4 text-sm text-muted-foreground">
        No interview timeline available.
      </Card>
    );
  }

  const sortedInterviews = [...interviews].sort(
    (a, b) => a.roundNumber - b.roundNumber
  );

  return (
    <div className="space-y-4">
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
    <Card className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">
            Round {roundNumber} — {roundType}
          </h3>

          <p className="text-sm text-muted-foreground">
            {format(new Date(startTime), "dd MMM yyyy, hh:mm a")} →{" "}
            {format(new Date(endTime), "hh:mm a")}
          </p>
        </div>

        <StatusBadge status={status} />
      </div>

      <Separator />

      {/* Timeline */}
      <div className="space-y-3">
        {statusHistory.length > 0 ? (
          statusHistory.map((item, index) => (
            <div key={index} className="flex gap-3">
              {/* Timeline dot */}
              <div className="mt-1 h-2 w-2 rounded-full bg-primary" />

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {item.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(
                      new Date(item.changedAt),
                      "dd MMM, hh:mm a"
                    )}
                  </span>
                </div>

                {item.note && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.note}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No status updates yet.
          </p>
        )}
      </div>

      {/* Optional Round Notes */}
      {notes && (
        <>
          <Separator />
          <p className="text-sm text-muted-foreground">
            <b>Note:</b> {notes}
          </p>
        </>
      )}
    </Card>
  );
}


/* Status Badge */


function StatusBadge({ status }: { status: Interview["status"] }) {
  const variant =
    status === "Completed"
      ? "secondary"
      : status === "Selected"
      ? "default"
      : status === "Rejected"
      ? "destructive"
      : "outline";

  return <Badge variant={variant}>{status}</Badge>;
}
