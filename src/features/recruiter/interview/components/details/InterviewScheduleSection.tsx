import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";

import { useInterviewScheduleModalStore } from "../../stores/interviewScheduleModal.store";
import type { ScheduleInterviewPayload } from "../../types/scheduledInterview.types";

export function InterviewScheduleSection({
  interview,
}: {
  interview:ScheduleInterviewPayload ;
}) {
    const {openModal}=useInterviewScheduleModalStore()
  
  const scheduled = interview.startTime && interview.endTime;

  return (
    <Card>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-medium">Schedule</h3>

        {scheduled ? (
          <>
            <p>
              {new Date(interview.startTime!).toLocaleString()} –{" "}
              {new Date(interview.endTime!).toLocaleString()}
            </p>
            <Button variant="outline" onClick={()=>openModal(interview)}>Reschedule</Button>
          </>
        ) : (
          <Button onClick={()=>openModal()}>Schedule Interview</Button>
        )}
      </CardContent>
    </Card>
  );
}
