import { ApplicantCard } from "../components/application/applicationList";
import useRecruiterFetchApplications from "../hooks/useFetchApplicants";
import type { RecruiterApplicationDTO } from "../types/application.dto";


export default function RecruiterApplicantionsPage() {
  const { data: applicantions, isLoading } = useRecruiterFetchApplications();

  if (isLoading) return <p>Loading...</p>;
console.log(applicantions)
  return (
   
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Applicants</h2>

      {applicantions?.map((app: RecruiterApplicationDTO) => (
        <ApplicantCard
          key={app.id}
          applicant={app}
          onView={() => window.location.assign(`/recruiter/applicants/${app.id}`)}
        />
      ))}
    </div>
    
  );
}
