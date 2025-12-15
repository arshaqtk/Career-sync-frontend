import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import CandidateLayout from "@/layouts/CandidateLayout";
import RecruiterLayout from "@/layouts/RecruiterLayout";

// Candidate pages
import CandidateDashboard from "@/features/candidate/pages/dashboard";
import CandidateJobsPage from "@/features/candidate/pages/jobs";
import ApplicationsPage from "@/features/candidate/pages/applications";
import CandidateProfilePage from "@/features/candidate/pages/profile";
import EditProfilePage from "@/features/candidate/pages/editProfile";

// Recruiter pages
// import RecruiterDashboard from "@/features/recruiter/pages/dashboard";
import RecruiterJobsPage from "@/features/recruiter/pages/RecruiterJobPage";
import JobApplicantsPage from "@/features/recruiter/pages/jobApplicantsPage";
import ApplicantDetailsPage from "@/features/recruiter/pages/ApplicantsDetailsViewPage";

// Auth pages
import LoginPage from "@/features/auth/pages/Login";
import RegisterPage from "@/features/auth/pages/Register";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- Candidate Routes ---------- */}
        <Route element={<CandidateLayout />}>
          <Route path="/" element={<CandidateDashboard />} />
          <Route path="/jobs" element={<CandidateJobsPage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
          <Route path="/profile" element={<CandidateProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
        </Route>

        {/* ---------- Recruiter Routes ---------- */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          {/* <Route index element={<RecruiterDashboard />} /> */}
          <Route path="jobs" element={<RecruiterJobsPage />} />
          <Route path="jobs/:jobId/applicants" element={<JobApplicantsPage />} />
          <Route path="applicants/:applicationId" element={<ApplicantDetailsPage />} />
        </Route>

        {/* ---------- Auth Routes ---------- */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        
        {/* Optional 404 */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}
