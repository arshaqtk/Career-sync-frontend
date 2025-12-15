import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import type { ApplicantDTO } from "../../dto/applicant.dto";


type JobInfoProps={job:ApplicantDTO["jobId"]}

export  function JobInfoCard({ job }:JobInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <p><strong>Title:</strong> {job?.title}</p>
        <p><strong>Company:</strong> {job?.company}</p>
        <p><strong>Location:</strong> {job?.location}</p>
        <p><strong>Employment Type:</strong> {job?.jobType}</p>
        <p><strong>Salary Range:</strong> {job?.salary}</p>
      </CardContent>
    </Card>
  );
}
