
import { JobList } from "../components/jobs/jobList";
import { JobDetails } from "../components/jobs/JobDetails";
import useCandidateJobData from "../hooks/useCandidateJobs";
import { useJobStore } from "../store/selectedjob.store";

export default function JobPage() {
 const { selectedJob, setSelectedJob } = useJobStore();
  const {data:jobs,isLoading}=useCandidateJobData()
  if (isLoading) return <div>Loading...</div>;
  return (
     
    <div className="flex w-full h-[calc(100vh-70px)]">
      <JobList jobs={jobs?.jobs}  onSelect={(job) => setSelectedJob(job)} />
      <JobDetails job={selectedJob} />
    </div>
   
  );
}
