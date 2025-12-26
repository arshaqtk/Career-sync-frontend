import { Card, CardContent } from "@/components/ui/shadcn/card";
import { ApplicantCard } from "../components/application/applicationList";
import useRecruiterFetchApplications from "../hooks/useFetchApplicants";
import type { RecruiterApplicationDTO } from "../types/application.dto";
import { Inbox, Users } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { TableSkeleton } from "@/components/Skelton/TableSkelton";


export default function RecruiterApplicantionsPage() {
  const { data: applications, isLoading,isError } = useRecruiterFetchApplications();

  if (isLoading) {
     return <TableSkeleton rows={6} columns={7} />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-destructive">Failed to load applicants. Please try again later.</p>
      </div>
    );
  }
  const hasApplicants = applications.length > 0;
  return (
   
       <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Applicants</h2>
        <p className="text-muted-foreground">
          {applications.length} {applications.length === 1 ? "application" : "applications"}
        </p>
      </div>

      {hasApplicants ? (
        <div className="grid grid-cols-1 gap-4">
          {applications.map((app: RecruiterApplicationDTO) => (
            <ApplicantCard
              key={app.id}
              applicant={app}
              onView={() => window.location.assign(`/recruiter/applicants/${app.id}`)}
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
