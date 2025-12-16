import { useParams} from "react-router-dom";
import { ApplicantCard } from "../components/application/applicationList";
import  {useRecruiterJobApplications} from "../hooks/useFetchJobBasedApplicants";
import type { RecruiterApplicationDTO } from "../types/application.dto";


export default function JobApplicantsPage() {
 const { jobId } = useParams<{ jobId: string }>();
  const { data: applicants, isLoading } = useRecruiterJobApplications(jobId as string);

  if (isLoading) return <p>Loading...</p>;

  return (
   
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Applicants</h2>

      {applicants?.map((app: RecruiterApplicationDTO) => (
        <ApplicantCard
          key={app.id}
          applicant={app}
          onView={() => window.location.assign(`/recruiter/applicants/${app.id}`)}
        />
      ))}
    </div>
    
  );
}
