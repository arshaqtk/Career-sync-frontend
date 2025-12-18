import { Card, CardContent } from "@/components/ui/shadcn/card";

export function InterviewTimeline({
  timeline,
}: {
  timeline: { status: string; changedAt: string }[];
}) {
  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-medium">Timeline</h3>

        {timeline.map((item, i) => (
          <div key={i} className="text-sm">
            {item.status} —{" "}
            {new Date(item.changedAt).toLocaleString()}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
