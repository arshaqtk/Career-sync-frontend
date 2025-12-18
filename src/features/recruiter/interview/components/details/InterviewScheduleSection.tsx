import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import type{ InterviewDetails } from "../../types/interview-details.types";

export function InterviewScheduleSection({
  interview,
}: {
  interview: InterviewDetails;
}) {
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
            <Button variant="outline">Reschedule</Button>
          </>
        ) : (
          <Button>Schedule Interview</Button>
        )}
      </CardContent>
    </Card>
  );
}
