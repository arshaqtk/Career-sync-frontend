
import { JobList } from "../components/jobs/jobList";
import { JobDetails } from "../components/jobs/JobDetails";
import useCandidateJobData from "../hooks/useCandidateJobs";
import { useJobStore } from "../store/selectedjob.store";
import { useState } from "react";
import { JobsPagination } from "../components/jobs/JobsPagination";
import { JobFilter } from "../components/jobs/jobFilter";
import type { JobFilters } from "../types/jobFilter.types";
import { SectionSkeleton } from "@/components/Loaders";
import { handleRQError } from "@/lib/react-query/errorHandler";

export default function JobPage() {

  const [page, setPage] = useState(1);
 const [filters, setFilters] = useState<JobFilters>({
  status: "all",
  jobType: "all",
  search: "",
});

  const { selectedJob, setSelectedJob } = useJobStore();
  const { data: jobs, isLoading,isFetching,isError,error } = useCandidateJobData({ page, limit: 5,filters})


  if (isLoading) {
     return <SectionSkeleton />
   }
   if(isError)handleRQError(error)

  return (
    <div className="my-2">
     <JobFilter
  filters={filters}
  onChange={setFilters}
/>
  {/* Empty State */}
      {!isLoading && jobs?.jobs.length === 0 ? (
        <div className="py-20 flex flex-col items-center text-center space-y-4">
          <div className="text-5xl">📭</div>
          <h2 className="text-xl font-semibold">No jobs found</h2>
          <p className="text-muted-foreground max-w-sm">
            Try adjusting filters
          </p>
        </div>
      ):(<>
      <div className="flex w-full h-[calc(100vh-70px)] my-3">
        <JobList jobs={jobs?.jobs} onSelect={(job) => setSelectedJob(job)} isFetching={isFetching} />
        <JobDetails job={selectedJob} />
      </div>
      <JobsPagination
        page={page}
        totalPages={jobs?.pagination?.totalPages}
        onPageChange={setPage}
      />
      </>
      )}
      
    </div>

  );
}
