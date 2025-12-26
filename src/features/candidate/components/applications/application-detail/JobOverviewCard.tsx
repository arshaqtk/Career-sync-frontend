import { Badge } from "@/components/ui/shadcn/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import type { JobDetails } from "@/features/candidate/types/applicationDetail.types";


export const JobDetailsCard=({ job }: { job: JobDetails })=> {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <p><strong>Role:</strong> {job.title}</p>
        <p><strong>Type:</strong> {job.jobType}</p>
        <p>
          <strong>Experience:</strong>{" "}
          {job.experienceMin} – {job.experienceMax} years
        </p>

        <div className="flex flex-wrap gap-2">
          {job.skills?.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>

        {job.description && (
          <p className="text-muted-foreground">{job.description}</p>
        )}
      </CardContent>
    </Card>
  )
}
