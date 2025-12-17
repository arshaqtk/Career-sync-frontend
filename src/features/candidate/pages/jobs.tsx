
import { JobList } from "../components/jobs/jobList";
import { JobDetails } from "../components/jobs/JobDetails";
import useCandidateJobData from "../hooks/useCandidateJobs";
import { useJobStore } from "../store/selectedjob.store";
import { useState } from "react";
import { JobsPagination } from "../components/jobs/JobsPagination";
import { JobFilter } from "../components/jobs/jobFilter";
import type { JobFilters } from "../types/jobFilter.types";

export default function JobPage() {

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<JobFilters>({
  status: "all",
  jobType: "all",
});

  const { selectedJob, setSelectedJob } = useJobStore();
  const { data: jobs, isLoading } = useCandidateJobData({ page, limit: 5,filters})


  if (isLoading) return <div>Loading...</div>;


  return (
    <div className="my-2">
      <JobFilter filters={filters} onChange={setFilters} />
      <div className="flex w-full h-[calc(100vh-70px)] my-3">
        <JobList jobs={jobs?.jobs} onSelect={(job) => setSelectedJob(job)} />
        <JobDetails job={selectedJob} />
      </div>
      <JobsPagination
        page={page}
        totalPages={jobs.pagination.totalPages}
        onPageChange={setPage}
      />
    </div>

  );
}
