import DashboardPage from "@/features/candidate/pages/dashBoard";
import { CandidateProfilePage } from "@/features/candidate/pages/profile";
import EditProfilePage from "@/features/candidate/pages/editProfile";
import JobPage from "@/features/candidate/pages/jobs";
import ApplicationsPage from "@/features/candidate/pages/applications";

export const candidateRoutes = [
  { path: "", element: <DashboardPage /> },
  { path: "profile", element: <CandidateProfilePage /> },
  { path: "edit-profile", element: <EditProfilePage /> },
  { path: "jobs", element: <JobPage /> },
  {path:"applications", element:<ApplicationsPage/>}
];
