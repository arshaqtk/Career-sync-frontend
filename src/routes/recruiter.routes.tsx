import { RecruiterDashboard } from "@/features/recruiter/components/dashboard/dashboard";
import JobApplicantsPage from "@/features/recruiter/pages/jobApplicantsPage";
import RecruiterJobPage from "@/features/recruiter/pages/RecruiterJobPage";

export const recruiterRoutes = [
  { path: "recruiter/", element: <RecruiterDashboard /> },
  { path: "recruiter/jobs", element: <RecruiterJobPage /> },
  {path:"/recruiter/jobs/:jobId/applicants" ,element:<JobApplicantsPage/>}
];
