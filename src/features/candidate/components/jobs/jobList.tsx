import { InlineSpinner } from "@/components/Loaders";
import { JobCard } from "../cards/job-card";
import type{ CandidateJob } from "@/features/candidate/types/candidateJob.type";

interface JobListProps {
  jobs: CandidateJob[];
  onSelect: (job: CandidateJob) => void;
  isFetching:boolean;
}

export function JobList({ jobs, onSelect,isFetching }: JobListProps) {
  if(isFetching)return <div className="w-1/2 h-full flex justify-center items-center">
<InlineSpinner/>
  </div> 
  return (
    <div className="w-[45%] h-full overflow-y-auto border-r p-4 space-y-3 scrollbar-hide">
      {jobs?.map((job, i) => (
        <JobCard key={i} job={job} onClick={() => onSelect(job)} />
      ))}
    </div>
  );
}
