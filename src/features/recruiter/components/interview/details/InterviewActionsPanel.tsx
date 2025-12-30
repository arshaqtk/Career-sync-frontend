import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Separator } from "@/components/ui/shadcn/separator";
import {
  CheckCircle,
  CalendarClock,
  XCircle,
  Users,
} from "lucide-react";

import type { InterviewDetails } from "../../../types/interview-details.types";
import { InterviewStatusBadge } from "../list/InterviewStatusBadge";
import { useUpdateInterviewStatusStore } from "@/features/recruiter/store/interviewUpdateStatusDialog.store";
import { useInterviewScheduleModalStore } from "@/features/recruiter/store/interviewScheduleModal.store";

export function InterviewActionsPanel({
  interview,
}: {
  interview: InterviewDetails;
}) {
   const { openModal } = useUpdateInterviewStatusStore();
  const { openModal:scheduleModalOpen } = useInterviewScheduleModalStore();
   const lastStatus =
    interview.statusHistory?.[interview.statusHistory.length - 1]?.status;

  const isScheduled = lastStatus === "Scheduled";
  const isCompleted = lastStatus === "Completed";
  const isCancelled = lastStatus === "Cancelled";


  return (
    <Card className="sticky top-6">
      {/* Header */}
      <CardHeader className="space-y-4">
        {/* Big Round Icon */}
        <div className="flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Users className="h-8 w-8" />
          </div>
        </div>

        {/* Interview Level Info */}
        <div className="text-center space-y-1">
          <p className="text-sm text-muted-foreground">
            Round {interview.roundNumber}
          </p>
          <p className="font-semibold capitalize">
            {interview.roundType} Interview
          </p>
        </div>

        <CardTitle className="text-base flex items-center justify-between">
          Actions
          <InterviewStatusBadge status={lastStatus} />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Primary Actions */}
        {!isCompleted && !isCancelled && (
          <div className="space-y-2">
            {isScheduled ? (
              <Button className="w-full" size="sm" 
               onClick={() =>
  scheduleModalOpen({
    mode: "reschedule",
    interview,
  })
}>
                <CalendarClock className="mr-2 h-4 w-4" />
                Reschedule Interview
              </Button>
            ) : (
              <Button className="w-full" size="sm">
                <CalendarClock className="mr-2 h-4 w-4" />
                Schedule Interview
              </Button>
            )}

            <Button
              variant="secondary"
              className="w-full"
              size="sm"
              onClick={() =>
                openModal({
                  status: "Completed",
                  roundNumber: interview.roundNumber,
                })
              }
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
          </div>
        )}

        {/* Info Messages */}
        {isCompleted && (
          <p className="text-sm text-muted-foreground text-center">
            This interview has been completed.
          </p>
        )}

        {isCancelled && (
          <p className="text-sm text-muted-foreground text-center">
            This interview was cancelled.
          </p>
        )}

        {/* Danger Zone */}
        {!isCancelled && !isCompleted && (
          <>
            <Separator />
            <Button
              variant="destructive"
              className="w-full"
              size="sm"
              onClick={() =>
                openModal({
                  status: "Cancelled",
                  roundNumber: interview.roundNumber,
                })
              }
            >
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Interview
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
