import { Card, CardContent } from "@/components/ui/shadcn/card";
// import { ApplicantCard } from "../components/application/applicationList";
import useRecruiterFetchApplications from "../hooks/useFetchApplicants";
// import type { RecruiterApplicationDTO } from "../types/application.dto";
import { Inbox, Users } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import { TableSkeleton } from "@/components/Skelton/TableSkelton";
import { handleRQError } from "@/lib/react-query/errorHandler";
import { useState } from "react";
import { ApplicationFilter } from "../components/application/applicationFilter";
import type { ApplicationFilters } from "../types/applicationFilters";
// import { PageHeader } from "../components/shared/PageHeader";
import { ApplicationTable } from "../components/application/ApplicationTable";


export default function RecruiterApplicantionsPage() {
   const [page, setPage] = useState(1);
    const [filters, setFilters] = useState<ApplicationFilters>({
      status: "all",
      sortBy:"newest"
    });

  const { data, isLoading,isError,error } = useRecruiterFetchApplications(
   { page,
    limit:5,
    filters}
  );

  if (isLoading) {
     return <TableSkeleton rows={6} columns={7} />;
  }

  if (isError) {
      if(error)handleRQError(error)
    
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-destructive">Failed to load applicants. Please try again later.</p>
      </div>
    );
  }

  const applications=data?.applications
  const hasApplicants = applications?.length > 0;
   const pagination = data?.pagination
return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">Applications</h1>
        <p className="mt-1 text-sm text-gray-500">Review and manage candidate applications</p>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ApplicationFilter
          filters={filters}
          onChange={(next) => {
            setPage(1);
            setFilters(next);
          }}
        />

        {applications && applications.length > 0 && (
          <div className="text-sm text-gray-500">
            {applications.length} {applications.length === 1 ? "application" : "applications"}
          </div>
        )}
      </div>

      {hasApplicants ? (
        <ApplicationTable
          applications={applications || []}
          isLoading={isLoading}
        />
      ) : (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-gray-100 p-6 mb-6">
              <Inbox className="h-12 w-12 text-gray-400" />
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
            <p className="text-gray-500 max-w-md mb-8">
              No candidates have applied to your job postings yet. Once someone applies, their profile will appear here.
            </p>

            <Button variant="outline" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Share Job Posting
            </Button>
          </CardContent>
        </Card>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>

          <span className="flex items-center px-4 text-sm text-gray-600 bg-white rounded border border-gray-200">
            Page {pagination.page} of {pagination.totalPages}
          </span>

          <Button
            variant="outline"
            disabled={page === pagination.totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
