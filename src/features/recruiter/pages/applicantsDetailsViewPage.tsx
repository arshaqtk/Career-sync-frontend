import { useParams } from "react-router-dom";
import { useGetApplicantDetails } from "../hooks/useGetApplicantDetails";

import {CandidateProfileCard} from "../components/application/CandidateProfileCard";
import {JobInfoCard} from "../components/application/JobInfoCard";
import {ApplicationInfoCard} from "../components/application/ApplicationInfoCard";
import {ResumeModal} from "../components/application/resumeModal";
import { RecruiterActions } from "../components/application/recruiterAction";

export default function ApplicantDetailPage() {
  const { applicationId } = useParams();
  const { data, isLoading } = useGetApplicantDetails(applicationId!);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No application found.</p>;
  console.log(data)
  return (
    <div className="space-y-6 max-w-4xl my-5">
      <h2 className="text-2xl font-semibold">Applicant Details</h2>

      <CandidateProfileCard candidate={data.candidateId} />

      <JobInfoCard job={data.jobId} />

      <ApplicationInfoCard application={data} />

      <ResumeModal resumeUrl={data.resumeUrl} />

      <RecruiterActions applicationId={applicationId!} currentStatus={data.status}/>
    </div>
  );
}
