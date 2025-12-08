import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";
import { JobHeader } from "../components/job/JobHeader";
import { JobMetaInfo } from "../components/job/JobMetaInfo";
import { JobDescription } from "../components/job/JobDescription";
import { JobSkills } from "../components/job/jobSkills";
import { JobActions } from "../components/job/jobActions";
import useRecruiterJob from "../hooks/useRecruiterJob";
import { Separator } from "@/components/ui/shadcn/separator";
import type { Job } from "@/types/job.type";
import RecruiterLayout from "@/layouts/dashboard-layout";
import { Button } from "@/components/ui/shadcn/button";
import { Plus } from "lucide-react";
import { AddJobModal } from "../components/job/jobModal";
import { useJobModalStore } from "../store/openJobModalStore";
import { useUpdateJob } from "../hooks/useUpdateJob";
import { useAddJob } from "../hooks/useAddJob";

export default function RecruiterJobPage() {
  const { data, isLoading } = useRecruiterJob();
  const {mutate:addJob}=useAddJob()
  const {mutate:updateJob}=useUpdateJob()


  const { openModal } = useJobModalStore();

  const handleModalSubmission=(payload:{jobId?:string,job:Job})=>{
    if(payload.jobId){
      updateJob({jobId: payload.jobId,   data: payload.job})
    }else{
      addJob({data:payload.job})
    }
  }


  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>Job not found</p>;
  const job = data.jobs as Job[];


  return (
    <RecruiterLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mt-6">
          <Button 
            onClick={() => openModal()}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Add Job
          </Button>
        </div>

        <AddJobModal onSubmit={(payload) => handleModalSubmission(payload)}/>

        {job?.map((job, i) => (
          <Card className="shadow-sm rounded-2xl my-10" key={i}>
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
              <JobActions id={job._id ?? ""} status={job.status} job={job} />
            </CardContent>
          </Card>
        ))}
      </div>
    </RecruiterLayout>
  );
}
