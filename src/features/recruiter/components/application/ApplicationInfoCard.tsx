import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";
import type { ApplicantDTO } from "../../dto/applicant.dto";

type ApplicationInfoProps = Pick<
  ApplicantDTO,
  | "status"
  | "experience"
  | "currentRole"
  | "expectedSalary"
  | "noticePeriod"
  | "createdAt"
  | "coverLetter"
>;

export  function ApplicationInfoCard({ application }:{application:ApplicationInfoProps}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Application Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="flex items-center gap-2">
          <strong>Status:</strong>
          <Badge variant="outline">{application.status}</Badge>
        </p>

        <p><strong>Current Role:</strong> {application.currentRole}</p>
        <p><strong>Experience:</strong> {application.experience}</p>
        <p><strong>Expected Salary:</strong> ₹{application.expectedSalary}</p>
        <p><strong>Notice Period:</strong> {application.noticePeriod}</p>

        <p><strong>Applied On:</strong> 
          {new Date(application.createdAt).toDateString()}
        </p>

        {application.coverLetter && (
          <div>
            <strong>Cover Letter:</strong>
            <p className="text-gray-700 whitespace-pre-line">
              {application.coverLetter}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
