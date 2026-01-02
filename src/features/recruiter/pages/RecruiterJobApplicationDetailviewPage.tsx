import { useParams } from "react-router-dom";
import { useRecruiterApplicantDetails } from "../hooks/useGetApplicantDetails";

import {CandidateProfileCard} from "../components/application/CandidateProfileCard";
import {JobInfoCard} from "../components/application/JobInfoCard";
import {ApplicationInfoCard} from "../components/application/ApplicationInfoCard";
import {ResumeModal} from "../components/application/resumeModal";
import { RecruiterActions } from "../components/application/recruiterAction";
import { ScheduleInterviewModal } from "../components/modals/scheduleInterview.modal"; 
import { useInterviewScheduleModalStore } from "../store/interviewScheduleModal.store";
import type { ScheduleInterviewPayload } from "../types/scheduledInterview.types";
import { useScheduleInterview } from "../hooks/useRecruiterScheduleInterview";
import { toast } from "sonner";
import { SectionSkeleton } from "@/components/Loaders";

export default function JobApplicantionDetailPage() {
  const { applicationId } = useParams();
  const { data, isLoading } = useRecruiterApplicantDetails(applicationId!);
  const {closeModal,open}=useInterviewScheduleModalStore()
   const {mutate:scheduleInterview,isPending}=useScheduleInterview()


  if (isLoading) return <SectionSkeleton/>
  if (!data) return <p>No application found.</p>;
  
  const handleScheduleSubmit=(data:Omit<ScheduleInterviewPayload,"scheduleMode">)=>{
    if(applicationId){
      scheduleInterview({...data,scheduleMode:"initial",applicationId})
    }else{
      toast.error("Something went wrong")
    }
  }
  return (
    <div className="space-y-6 max-w-4xl my-5">
      <h2 className="text-2xl font-semibold">Applicant Details</h2>

        <ScheduleInterviewModal
        isPending={isPending}
              open={open}
              onClose={closeModal}
              onSubmit={(data) => {
                handleScheduleSubmit(data)
              }}
            />
      <CandidateProfileCard candidate={data.candidateId} />

      <JobInfoCard job={data.jobId} />

      <ApplicationInfoCard application={data} />

      <ResumeModal resumeUrl={data.resumeUrl} />

      <RecruiterActions applicationId={applicationId!} currentStatus={data.status}/>
    </div>
  );
}
