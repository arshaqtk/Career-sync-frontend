
import { JobList } from "../components/jobs/jobList";
import { JobDetails } from "../components/jobs/JobDetails";
import useCandidateJobData from "../hooks/useCandidateJobs";
import { useJobStore } from "../store/selectedjob.store";
import { useEffect, useState } from "react";
import { JobsPagination } from "../components/jobs/JobsPagination";
import { JobFilter } from "../components/jobs/jobFilter";
import type { JobFilters } from "../types/jobFilter.types";
import { SectionSkeleton } from "@/components/Loaders";
import { handleRQError } from "@/lib/react-query/errorHandler";
import type { CandidateJob } from "../types/candidateJob.type";
import { useSearchParams } from "react-router-dom";
import { getValidParams } from "@/lib/utils";


export default function JobPage() {

  const [searchParams, setSearchParams] = useSearchParams()
  const pageFromUrl = Number(searchParams.get("page") ?? 1)
  const [page, setPage] = useState(pageFromUrl)

const updateFilters = (nextFilters: JobFilters) => {
  setPage(1)
  setFilters(nextFilters)

  const params = new URLSearchParams()

  Object.entries(nextFilters).forEach(([key, value]) => {
    if (value && value !== "all") {
      params.set(key, String(value))
    }
  })

  params.set("page", "1")
  setSearchParams(params)
}
// useEffect(() => {
//   const pageFromUrl = Number(searchParams.get("page") ?? 1)
//   setPage(pageFromUrl)
// }, [searchParams])


const updatePage = (nextPage: number) => {
  setPage(nextPage)

  const params = new URLSearchParams(searchParams)
  params.set("page", String(nextPage))
  setSearchParams(params)
}
  
  const [filters, setFilters] = useState<JobFilters>({
    status: "all",
    jobType: "all",
    search: "",
    location: "",
  });

  const STATUS_VALUES = ["all", "open", "closed", "draft"] as const
const JOB_TYPE_VALUES = ["all", "full-time", "part-time", "internship"] as const

useEffect(() => {
  setFilters({
    status: getValidParams(searchParams.get("status"), STATUS_VALUES, "all"),
    jobType: getValidParams(searchParams.get("jobType"), JOB_TYPE_VALUES, "all"),
    field:searchParams.get("field")??"",
    search: searchParams.get("search") ?? "",
    location: searchParams.get("location") ?? "",
  });
}, [searchParams]);







  const { selectedJob, setSelectedJob } = useJobStore();
  const { data: jobs, isLoading, isFetching, isError, error } = useCandidateJobData({ page, limit: 5, filters })


  useEffect(() => {
    if (!jobs?.jobs?.length) {
      setSelectedJob(null);
      return;
    }

    const stillExists = jobs.jobs.find((job: CandidateJob) =>
      job._id === selectedJob?._id)

    if (!stillExists) {
      setSelectedJob(jobs.jobs[0])
    }
  }, [jobs?.jobs, selectedJob, setSelectedJob])



  if (isLoading) {
    return <SectionSkeleton />
  }
  if (isError) handleRQError(error)



    
  return (
    <div className="my-2">
      <JobFilter
        filters={filters}
        onChange={updateFilters}
      />
      {/* Empty State */}
      {!isLoading && jobs?.jobs.length === 0 ? (
        <div className="py-20 flex flex-col items-center text-center space-y-4">
          <div className="text-5xl">📭</div>
          <h2 className="text-xl font-semibold">No jobs found for your field</h2>
          <p className="text-muted-foreground max-w-sm">
            Try adjusting filters Or change the field
          </p>
        </div>
      ) : (<>
        <div className="flex w-full h-[calc(100vh-70px)] my-3 gap-6 ">
          <JobList jobs={jobs?.jobs} onSelect={(job) => setSelectedJob(job)} isFetching={isFetching} selectedJobId={selectedJob?._id} />
          <JobDetails job={selectedJob} />
        </div>
        <JobsPagination
          page={page}
          totalPages={jobs?.pagination?.totalPages}
          onPageChange={updatePage}
        />
      </>
      )}

    </div>

  );
}
