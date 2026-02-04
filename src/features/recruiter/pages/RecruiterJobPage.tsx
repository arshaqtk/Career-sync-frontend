import { JobTable } from "../components/job/JobTable";
import useRecruiterJob from "../hooks/useRecruiterJob";
import type { Job } from "@/features/recruiter/types/job.type";
import { Button } from "@/components/ui/shadcn/button";
import { Plus } from "lucide-react";
import { AddJobModal } from "../components/job/jobModal";
import { useJobModalStore } from "../store/openJobModalStore";
import { useUpdateJob } from "../hooks/useUpdateJob";
import { useAddJob } from "../hooks/useAddJob";
import { JobFilter } from "../components/job/JobFilter";
import { useState, useEffect } from "react";
import type { JobFilters } from "../types/jobFilter.types";
import { RecruitereJobsPagination } from "../components/job/JobsPagination";
import { handleRQError } from "@/lib/react-query/errorHandler";

export default function RecruiterJobPage() {
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState<JobFilters>({
    status: "all",
    jobType: "all",
    search: "",
  });

  const { data, isLoading, error } = useRecruiterJob({
    page,
    limit: 5,
    filters,
  });
  useEffect(() => {
    if (error) handleRQError(error);
  }, [error]);

  const { mutate: addJob } = useAddJob();
  const { mutate: updateJob } = useUpdateJob();
  const { openModal } = useJobModalStore();

  const handleModalSubmission = (payload: {
    jobId?: string;
    job: Job;
  }) => {
    if (payload.jobId) {
      updateJob({ jobId: payload.jobId, data: payload.job });
    } else {
      addJob({ data: payload.job });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">Job Postings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage and track all your job listings</p>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <JobFilter
          filters={filters}
          onChange={(next) => {
            setPage(1);
            setFilters(next);
          }}
        />

        <Button
          onClick={() => openModal()}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Job
        </Button>
      </div>

      <AddJobModal onSubmit={handleModalSubmission} />

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="animate-pulse space-y-3">
            <div className="h-3 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && data?.jobs.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-500 mb-6">
            Try adjusting your filters or create a new job posting.
          </p>
          <Button onClick={() => openModal()}>
            <Plus className="h-4 w-4 mr-2" />
            Create Job
          </Button>
        </div>
      )}

      {/* Job Table View */}
      {!isLoading && data?.jobs && data.jobs.length > 0 && (
        <JobTable jobs={data.jobs} isLoading={isLoading} />
      )}

      {/* Pagination */}
      {!isLoading && data && data.pagination.totalPages > 1 && (
        <RecruitereJobsPagination
          page={page}
          totalPages={data.pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
