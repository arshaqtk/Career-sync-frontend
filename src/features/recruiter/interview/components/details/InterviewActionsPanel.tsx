import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Separator } from "@/components/ui/shadcn/separator";
import { CheckCircle, CalendarClock, XCircle } from "lucide-react";
import type { InterviewDetails } from "../../types/interview-details.types";
import { InterviewStatusBadge } from "../list/InterviewStatusBadge";

export function InterviewActionsPanel({
  interview,
}: {
  interview: InterviewDetails;
}) {
  const isScheduled = interview.status === "Scheduled";
  const isCompleted = interview.status === "Completed";
  const isCancelled = interview.status === "Cancelled";

  return (
    <Card className="sticky top-6">
      {/* Header */}
      <CardHeader className="space-y-1">
        <CardTitle className="text-base flex items-center justify-between">
          Actions
          <InterviewStatusBadge status={interview.status} />
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Primary Actions */}
        {!isCompleted && !isCancelled && (
          <div className="space-y-2">
            {isScheduled ? (
              <Button className="w-full" size="sm">
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
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
          </div>
        )}

        {/* Info Message */}
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
            <div className="space-y-2">
              <Button
                variant="destructive"
                className="w-full"
                size="sm"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Cancel Interview
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
