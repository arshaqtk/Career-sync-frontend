import { ApplicantCard } from "../components/application/applicationList";
import { useGetApplicants } from "../hooks/useGetApplicants";

export default function JobApplicantsPage({ jobId }: any) {
  const { data: applicants, isLoading } = useGetApplicants(jobId);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Applicants</h2>

      {applicants?.map((app: any) => (
        <ApplicantCard
          key={app.id}
          applicant={app}
          onView={() => window.location.assign(`/recruiter/applicants/${app.id}`)}
        />
      ))}
    </div>
  );
}
