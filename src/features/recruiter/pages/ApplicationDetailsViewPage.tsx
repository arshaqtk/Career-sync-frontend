import { useParams } from "react-router-dom";
import { useRecruiterApplicantDetails } from "../hooks/useGetApplicantDetails";

import {CandidateProfileCard} from "../components/application/CandidateProfileCard";
import {JobInfoCard} from "../components/application/JobInfoCard";
import {ResumeModal} from "../components/application/resumeModal";


import { RecruiterFinalizeApplicationActions } from "../components/application/FinalizeApplicationAction";
import { InterviewTimeline } from "../components/application/interviewTimeLine";
import { useRecruiterInterviewTimeline } from "../hooks/useRecruiterApplicationInterviews";
import { toast } from "sonner";
import { SectionSkeleton } from "@/components/Loaders";
import { handleRQError } from "@/lib/react-query/errorHandler";

export default function ApplicantionDetailPage() {
  const { applicationId } = useParams();
  if(!applicationId){
    toast.error("Something went wrong...")
  }
  const { data, isLoading,error } = useRecruiterApplicantDetails(applicationId);
  const {data:interviews,isLoading:interviewIsLoading,error:timeLineError}=useRecruiterInterviewTimeline(applicationId!)

  if (isLoading||interviewIsLoading) return <SectionSkeleton/>
    if(error)handleRQError(error)
    if(timeLineError)handleRQError(timeLineError)
  
  if (!data) return <p>No application found.</p>;
  

  return (
    <div className="space-y-6 max-w-4xl my-5">
      <h2 className="text-2xl font-semibold">Applicant Details</h2>

       
      <CandidateProfileCard candidate={data.candidateId} />

      <JobInfoCard job={data.jobId} />

      <InterviewTimeline interviews={interviews.data}/>
      
      <ResumeModal resumeUrl={data.resumeUrl} />

      < RecruiterFinalizeApplicationActions applicationId={applicationId!} currentStatus={data.status} />
    </div>
  );
}
