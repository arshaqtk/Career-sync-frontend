import { useParams } from "react-router-dom";
import { motion } from "motion/react";
import { ApplicationTable } from "../components/application/ApplicationTable";
import { useRecruiterJobApplications } from "../hooks/useFetchJobBasedApplicants";

import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Inbox, Users } from "lucide-react";
import { handleRQError } from "@/lib/react-query/errorHandler";
import { useEffect } from "react";
import { TableSkeleton } from "@/components/Skelton/TableSkelton";

export default function JobApplicantsPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const { data: applicants = [], isLoading, isError, error } = useRecruiterJobApplications(jobId as string);
  useEffect(() => {
    if (isError && error) handleRQError(error);
  }, [isError, error]);

  if (isLoading) {
    return <TableSkeleton rows={6} columns={5} />
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-destructive">Failed to load applicants. Please try again later.</p>
      </div>
    );
  }

  const hasApplicants = applicants.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Applicants</h2>
        <p className="text-muted-foreground">
          {applicants.length} {applicants.length === 1 ? "application" : "applications"}
        </p>
      </div>

      {hasApplicants ? (
        <ApplicationTable
          applications={applicants}
          isLoading={isLoading}
          showJobColumn={false}
        />
      ) : (
        // Empty state / fallback UI
        <Card className="border-dashed border-2 bg-white/60 backdrop-blur-sm">
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
    </motion.div>
  );
}