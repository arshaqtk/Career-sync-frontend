import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"

interface Job {
  field: string;
  jobType: string;
  location: string;
  remote: boolean;
  experienceMin: number;
  experienceMax: number;
  salary?: string;
}

export function JobOverviewCard({ job }: { job: Job }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Overview</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 text-sm">
        <p><strong>Field:</strong> {job.field}</p>
        <p><strong>Job Type:</strong> {job.jobType}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Remote:</strong> {job.remote ? "Yes" : "No"}</p>
        <p><strong>Experience:</strong> {job.experienceMin}–{job.experienceMax} yrs</p>
        <p><strong>Salary:</strong> {job.salary || "Not specified"}</p>
      </CardContent>
    </Card>
  )
}
