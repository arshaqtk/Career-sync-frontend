import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";
import { JobHeader } from "../components/job/JobHeader";
import { JobMetaInfo } from "../components/job/JobMetaInfo";
import { JobDescription } from "../components/job/JobDescription";
import { JobSkills } from "../components/job/jobSkills";
import { JobActions } from "../components/job/jobActions";
import useRecruiterJob from "../hooks/useRecruiterJob";
import { Separator } from "@/components/ui/shadcn/separator";
import type { Job } from "@/types/job.type";
import { Button } from "@/components/ui/shadcn/button";
import { Plus } from "lucide-react";
import { AddJobModal } from "../components/job/jobModal";
import { useJobModalStore } from "../store/openJobModalStore";
import { useUpdateJob } from "../hooks/useUpdateJob";
import { useAddJob } from "../hooks/useAddJob";
import { JobFilter } from "../components/job/JobFilter";
import { useState } from "react";
import type { JobFilters } from "../types/jobFilter.types";
import { RecruitereJobsPagination } from "../components/job/JobsPagination";

export default function RecruiterJobPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<JobFilters>({
    status: "all",
    jobType: "all",
  });

  const { data: job, isLoading } = useRecruiterJob({
    page,
    limit: 5,
    filters,
  });

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
    <div className="max-w-4xl mx-auto space-y-8">
      
      <div className="flex items-center justify-between">
        <JobFilter filters={filters} onChange={(next) => {
          setPage(1);           
          setFilters(next);
        }} />

        <Button onClick={() => openModal()} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Job
        </Button>
      </div>

      <AddJobModal onSubmit={handleModalSubmission} />

     
      {isLoading && (
        <div className="py-20 text-center text-muted-foreground">
          Loading jobs...
        </div>
      )}

      {!isLoading && job?.jobs.length === 0 && (
        <div className="py-20 flex flex-col items-center text-center space-y-4">
          <div className="text-5xl">📭</div>
          <h2 className="text-xl font-semibold">No jobs found</h2>
          <p className="text-muted-foreground max-w-sm">
            Try adjusting filters or add a new job.
          </p>
        </div>
      )}

      {!isLoading &&
        job?.jobs.map((job) => (
          <Card key={job._id} className="shadow-sm rounded-2xl">
            <CardHeader>
              <JobHeader
                title={job.title}
                company={job.company}
                status={job.status}
              />
            </CardHeader>

            <CardContent>
              <JobMetaInfo job={job} />
              <Separator className="my-6" />
              <JobDescription description={job.description} />
              <JobSkills skills={job.skills} />
              <JobActions
                id={job._id ?? ""}
                status={job.status}
                job={job}
              />
            </CardContent>
          </Card>
        ))}

      {/* Pagination (only if jobs exist) */}
      {!isLoading && job && job.pagination.totalPages > 1 && (
        <RecruitereJobsPagination
          page={page}
          totalPages={job.pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}


