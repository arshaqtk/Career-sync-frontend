import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { cn } from "@/lib/utils";
import {
  CalendarCheck,
  CalendarClock,
  Clock,
  XCircle,
  CheckCircle2,
} from "lucide-react";
import type { InterviewStatus } from "../../types/interview-details.types";

type TimelineItem = {
  status: InterviewStatus;
  changedAt: string;
  note?: string;
};

const statusConfig: Record<
  InterviewStatus,
  {
    label: string;
    icon: React.ElementType;
    color: string;
    bg: string;
  }
> = {
  Pending: {
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-100",
  },
  Scheduled: {
    label: "Scheduled",
    icon: CalendarCheck,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  Rescheduled: {
    label: "Rescheduled",
    icon: CalendarClock,
    color: "text-indigo-600",
    bg: "bg-indigo-100",
  },
  Completed: {
    label: "Completed",
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  Cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-600",
    bg: "bg-red-100",
  },
};

export function InterviewTimeline({ timeline, onReschedule, currentStatus}: {
  timeline: TimelineItem[];
  currentStatus: InterviewStatus;
  onReschedule?: () => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Interview Timeline</CardTitle>
      </CardHeader>

      <CardContent>
        <ol className="relative border-l border-muted pl-6 space-y-6">
          {timeline.map((item, index) => {
            const Icon = statusConfig[item.status].icon;

            return (
              <li
                key={index}
                className="relative animate-in fade-in slide-in-from-left-1 duration-300"
              >
                {/* Dot */}
                <span
                  className={cn(
                    "absolute -left-[13px] top-1 flex h-7 w-7 items-center justify-center rounded-full border",
                    statusConfig[item.status].bg,
                    statusConfig[item.status].color
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>

                {/* Content */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">
                      {statusConfig[item.status].label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.changedAt).toLocaleString()}
                    </span>
                  </div>

                  {item.note && (
                    <p className="text-sm text-muted-foreground">
                      {item.note}
                    </p>
                  )}

                  {/* Inline Reschedule Action */}
                  {item.status === "Rescheduled" &&
                    currentStatus !== "Completed" &&
                    currentStatus !== "Cancelled" &&
                    onReschedule && (
                      <Button
                        variant="link"
                        size="sm"
                        className="px-0 text-indigo-600"
                        onClick={onReschedule}
                      >
                        Reschedule again
                      </Button>
                    )}
                </div>
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
