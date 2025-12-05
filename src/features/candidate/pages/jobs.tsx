
import { JobList } from "../components/jobs/jobList";
import { JobDetails } from "../components/jobs/JobDetails";
import useCandidateJobData from "../hooks/useCandidateJobs";
import CandidateLayout from "@/layouts/dashboard-layout";
import { useJobStore } from "../store/selectedjob.store";

export default function JobPage() {
 const { selectedJob, setSelectedJob } = useJobStore();
  const {data:jobs,isLoading}=useCandidateJobData()
  console.log(jobs)
  if (isLoading) return <div>Loading...</div>;
  return (
     <CandidateLayout>
    <div className="flex w-full h-[calc(100vh-70px)]">
      <JobList jobs={jobs?.jobs}  onSelect={(job) => setSelectedJob(job)} />
      <JobDetails job={selectedJob} />
    </div>
    </CandidateLayout>
  );
}
