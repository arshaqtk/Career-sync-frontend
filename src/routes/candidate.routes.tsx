import DashboardPage from "@/features/candidate/pages/dashBoard";
import { CandidateProfilePage } from "@/features/candidate/pages/profile";
import EditProfilePage from "@/features/candidate/pages/editProfile";
import JobPage from "@/features/candidate/pages/jobs";

export const candidateRoutes = [
  { path: "", element: <DashboardPage /> },
  { path: "candidate-profile", element: <CandidateProfilePage /> },
  { path: "edit-profile", element: <EditProfilePage /> },
  { path: "jobs", element: <JobPage /> },
];
