import { ApplicantProfile } from "../components/ApplicantProfile";
import { RecruiterActions } from "../components/RecruiterActions";
import { ResumeViewer } from "../components/ResumeViewer";
import { useGetApplicantDetails } from "../hooks/useGetApplicantDetails";

export default function ApplicantDetailsPage({ params }: any) {
  const { id } = params;
  const { data: applicant, isLoading } = useGetApplicantDetails(id);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-6">
      <ApplicantProfile applicant={applicant} />

      <RecruiterActions
        applicationId={id}
        currentStatus={applicant.status}
      />

      <ResumeViewer resumeUrl={applicant.resumeUrl} />
    </div>
  );
}
