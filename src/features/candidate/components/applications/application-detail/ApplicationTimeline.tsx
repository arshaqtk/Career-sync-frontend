import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { STATUS_FLOW, type ApplicationDetails } from "@/features/candidate/types/applicationDetail.types";

// const timeline = [
//   { label: "Application Submitted", date: "Dec 20, 2024", done: true },
//   { label: "Application Under Review", date: "Dec 21, 2024", done: true },
//   { label: "Shortlisted", date: "Dec 23, 2024", done: true },
//   { label: "Interview Scheduled", date: "Dec 27, 2024", active: true },
//   { label: "Final Decision", status: "Pending" },
// ];

export const ApplicationTimeline=({ status }: { status: ApplicationDetails["status"] })=> {
  const activeIndex = STATUS_FLOW.indexOf(status)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Timeline</CardTitle>
      </CardHeader>

      <CardContent className="relative pl-6 space-y-6">
        <div className="absolute left-2 top-0 bottom-0 w-px bg-border" />

        {STATUS_FLOW.map((step, index) => (
          <div key={step} className="relative flex gap-4">
            <div
              className={`w-3 h-3 rounded-full mt-1 ${
                index <= activeIndex ? "bg-primary" : "bg-muted"
              }`}
            />

            <p
              className={`text-sm ${
                index <= activeIndex
                  ? "font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {step}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}