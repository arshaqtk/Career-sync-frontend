import { useNavigate, useParams } from "react-router-dom";
import { ApplicantCard } from "../components/application/applicationList";
import { useRecruiterJobApplications } from "../hooks/useFetchJobBasedApplicants";
import type { RecruiterApplicationDTO } from "../types/application.dto";

import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Inbox, Users } from "lucide-react";
import { Spinner } from "@/components/ui/shadcn/spinner";
import { handleRQError } from "@/lib/react-query/errorHandler";

export default function JobApplicantsPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const { data: applicants = [], isLoading, isError,error } = useRecruiterJobApplications(jobId as string);
const navigate=useNavigate()
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    handleRQError(error)
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-destructive">Failed to load applicants. Please try again later.</p>
      </div>
    );
  }

  const hasApplicants = applicants.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Applicants</h2>
        <p className="text-muted-foreground">
          {applicants.length} {applicants.length === 1 ? "application" : "applications"}
        </p>
      </div>

      {hasApplicants ? (
        <div className="grid grid-cols-1 gap-4">
          {applicants.map((app: RecruiterApplicationDTO) => (
            <ApplicantCard
              key={app.id}
              applicant={app}
              onView={() =>navigate(`/recruiter/jobs/:jobId/applicants/${app.id}`)}
            />
          ))}
        </div>
      ) : (
        // Empty state / fallback UI
        <Card className="border-dashed border-2">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6 mb-6">
              <Inbox className="h-12 w-12 text-muted-foreground" />
            </div>

            <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
            <p className="text-muted-foreground max-w-md mb-8">
              No candidates have applied to this job posting yet. Once someone applies, their profile will appear here.
            </p>

            <Button variant="outline" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Share Job Posting
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}