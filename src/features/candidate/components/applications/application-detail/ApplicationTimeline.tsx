import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { TimelineItem } from "../../../../../components/TimeLine/TimelineItem";

const timeline = [
  { label: "Application Submitted", date: "Dec 20, 2024", done: true },
  { label: "Application Under Review", date: "Dec 21, 2024", done: true },
  { label: "Shortlisted", date: "Dec 23, 2024", done: true },
  { label: "Interview Scheduled", date: "Dec 27, 2024", active: true },
  { label: "Final Decision", status: "Pending" },
];

export function ApplicationTimeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Progress</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {timeline.map((step, index) => (
          <TimelineItem key={index} step={step} />
        ))}
      </CardContent>
    </Card>
  );
}
