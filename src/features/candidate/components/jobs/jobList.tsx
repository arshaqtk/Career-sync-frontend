import { InlineSpinner } from "@/components/Loaders";
import { JobCard } from "../cards/job-card";
import type { CandidateJob } from "@/features/candidate/types/candidateJob.type";

interface JobListProps {
  jobs: CandidateJob[];
  selectedJobId?: string;
  onSelect: (job: CandidateJob) => void;
  isFetching: boolean;
}

export function JobList({ jobs, selectedJobId, onSelect, isFetching }: JobListProps) {
  if (isFetching && jobs?.length === 0) return (
    <div className="w-full md:w-[45%] h-full flex justify-center items-center py-20">
      <InlineSpinner />
    </div>
  );

  return (
    <div className="w-full md:w-[45%] h-full overflow-y-auto pr-2 scrollbar-hide pb-20 md:pb-6">
      <div className="flex flex-col gap-2">
        {jobs?.map((job, i) => (
          <JobCard
            key={job._id || i}
            job={job}
            onClick={() => onSelect(job)}
            isSelected={selectedJobId === job._id}
          />
        ))}
      </div>
    </div>
  );
}
