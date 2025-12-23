import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";

import { useInterviewScheduleModalStore } from "../../../store/interviewScheduleModal.store";
import type { ScheduleInterviewPayload } from "../../../types/scheduledInterview.types";

export function InterviewScheduleSection({
  interview,
}: {
  interview: ScheduleInterviewPayload;
}) {
  
    const {openModal}=useInterviewScheduleModalStore()

  const lastStatus =
    interview.statusHistory?.[interview.statusHistory.length - 1]?.status;

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-medium">Schedule</h3>

        {lastStatus === "Scheduled" ? (
          <>
            <p>
              {new Date(interview.startTime!).toLocaleString()} –{" "}
              {new Date(interview.endTime!).toLocaleString()}
            </p>

            {/* ✅ Pass interview for reschedule */}
            <Button
              variant="outline"
              onClick={() => openModal(interview)}
            >
              Reschedule
            </Button>
          </>
        ) : (
          /* ✅ Still call openModal, just without interview */
          <Button onClick={() => openModal()}>
            Schedule Interview
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

