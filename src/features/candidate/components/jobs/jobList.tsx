import { InlineSpinner } from "@/components/Loaders";
import { JobCard } from "../cards/job-card";
import type{ Job } from "@/types/job.type";

interface JobListProps {
  jobs: Job[];
  onSelect: (job: Job) => void;
  isFetching:boolean;
}

export function JobList({ jobs, onSelect,isFetching }: JobListProps) {
  if(isFetching)return <InlineSpinner/>
  return (
    <div className="w-[45%] h-full overflow-y-auto border-r p-4 space-y-3 scrollbar-hide">
      {jobs?.map((job, i) => (
        <JobCard key={i} job={job} onClick={() => onSelect(job)} />
      ))}
    </div>
  );
}
