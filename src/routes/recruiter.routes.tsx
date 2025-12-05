import { RecruiterDashboard } from "@/features/recruiter/components/dashboard/dashboard";
import RecruiterJobPage from "@/features/recruiter/pages/RecruiterJobPage";

export const recruiterRoutes = [
  { path: "recruiter", element: <RecruiterDashboard /> },
  { path: "recruiter/jobs", element: <RecruiterJobPage /> },
];
