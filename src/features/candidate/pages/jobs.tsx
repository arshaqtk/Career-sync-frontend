import { JobList } from "../components/jobs/jobList";
import { JobDetails } from "../components/jobs/JobDetails";
import useCandidateJobData from "../hooks/useCandidateJobs";
import { useJobStore } from "../store/selectedjob.store";
import { useEffect, useState } from "react";
import { JobsPagination } from "../components/jobs/JobsPagination";
import { JobFilter } from "../components/jobs/jobFilter";
import type { JobFilters } from "../types/jobFilter.types";
import { SectionSkeleton } from "@/components/Loaders";
import type { CandidateJob } from "../types/candidateJob.type";
import { useSearchParams } from "react-router-dom";
import { getValidParams } from "@/lib/utils";
import { Sheet, SheetContent } from "@/components/ui/shadcn/sheet";


export default function JobPage() {

  const [searchParams, setSearchParams] = useSearchParams()
  const pageFromUrl = Number(searchParams.get("page") ?? 1)
  const [page, setPage] = useState(pageFromUrl)

  const isMobileDetailOpen = searchParams.get("view") === "detail" && window.innerWidth < 768;

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
      field: searchParams.get("field") ?? "",
      search: searchParams.get("search") ?? "",
      location: searchParams.get("location") ?? "",
    });
  }, [searchParams]);

  const { selectedJob, setSelectedJob } = useJobStore();
  const { data: jobs, isLoading, isFetching, isError, error } = useCandidateJobData({ page, limit: 5, filters })

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const urlJobId = searchParams.get("id");

    if (jobs?.jobs?.length) {
      if (urlJobId) {
        const jobFromUrl = jobs.jobs.find((j: CandidateJob) => j._id === urlJobId);
        if (jobFromUrl && (!selectedJob || selectedJob._id !== urlJobId)) {
          setSelectedJob(jobFromUrl);
        } else if (!jobFromUrl && !selectedJob && isDesktop) {
          setSelectedJob(jobs.jobs[0]);
        }
      } else if (!selectedJob && isDesktop) {
        setSelectedJob(jobs.jobs[0]);
      }
    }
    
  }, [jobs?.jobs, selectedJob, setSelectedJob, searchParams]);

  // Handle mobile selection
  const handleJobSelect = (job: CandidateJob) => {
    setSelectedJob(job);
    const params = new URLSearchParams(searchParams);
    params.set("id", job._id as string);
    if (window.innerWidth < 768) {
      params.set("view", "detail");
    }
    setSearchParams(params);
  };

  const handleMobileOpenChange = (open: boolean) => {
    if (!open) {
      const params = new URLSearchParams(searchParams);
      params.delete("view");
      setSearchParams(params);
    }
  };

  if (isLoading) {
    return <SectionSkeleton />
  }
  if (isError) {
    throw error instanceof Error ? error : new Error("Failed to load jobs")
  }




  return (
    <div className="my-2">
      <JobFilter
        filters={filters}
        onChange={updateFilters}
      />
      {/* Empty State */}
      {!isLoading && jobs?.jobs?.length === 0 ? (
        <div className="py-20 flex flex-col items-center text-center space-y-4">
          <div className="text-5xl">📭</div>
          <h2 className="text-xl font-semibold">No jobs found for your field</h2>
          <p className="text-muted-foreground max-w-sm">
            Try adjusting filters Or change the field
          </p>
        </div>
      ) : (<>
        <div className="flex w-full h-[calc(100vh-70px)] my-3 gap-6 ">
          <JobList jobs={jobs?.jobs}
            onSelect={handleJobSelect}
            isFetching={isFetching}
            selectedJobId={selectedJob?._id} />
          {/* Desktop Job Details */}
          <div className="hidden md:block flex-1 h-full overflow-hidden border border-border rounded-lg shadow-sm">
            <JobDetails job={selectedJob} />
          </div>
          {/* Mobile Job Details Sheet */}
          <Sheet open={isMobileDetailOpen} onOpenChange={handleMobileOpenChange}>
            <SheetContent side="bottom" className="h-[96vh] p-0 border-none bg-card rounded-t-[2.5rem] shadow-[0_-8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_-8px_30px_rgba(255,255,255,0.03)] flex flex-col outline-none overflow-hidden">
              <div className="flex-none bg-card pt-5 pb-4 border-b border-border/50 relative">
                <div className="w-12 h-1.5 bg-muted rounded-full mx-auto" />
              </div>
              <div className="flex-1 overflow-y-auto scrollbar-hide">
                <JobDetails job={selectedJob} />
              </div>
            </SheetContent>
          </Sheet>
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
