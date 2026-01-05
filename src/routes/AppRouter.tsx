import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import CandidateLayout from "@/layouts/CandidateLayout";
import RecruiterLayout from "@/layouts/RecruiterLayout";

// Candidate pages
import CandidateJobsPage from "@/features/candidate/pages/jobs";
import ApplicationsPage from "@/features/candidate/pages/applications";
import CandidateProfilePage from "@/features/candidate/pages/profile";
import EditProfilePage from "@/features/candidate/pages/editProfile";

// Recruiter pages
import RecruiterDashboard from "@/features/recruiter/pages/RecruiterDashboardPage";
import RecruiterJobsPage from "@/features/recruiter/pages/RecruiterJobPage";
import JobApplicantsPage from "@/features/recruiter/pages/RecruiterJobApplicationsPage";
import ApplicantDetailsPage from "@/features/recruiter/pages/ApplicationDetailsViewPage";

// Auth pages
import LoginPage from "@/features/auth/pages/Login";
import RegisterPage from "@/features/auth/pages/Register";
import RecruiterCandidateProfilePage from "@/features/recruiter/pages/RecruiterCandidateProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RecruiterApplicantionsPage from "@/features/recruiter/pages/RecruiterApplicationsPage";
import RecruiterInterviewsPage from "@/features/recruiter/pages/RecruiterInterviewsPage";
import { VerifyRegisterOtp } from "@/features/auth/pages/VerifyRegisterOtp";
import RecruiterInterviewDetailsPage from "@/features/recruiter/pages/RecruiterInterviewDetailsPage";
import ResetPassword from "@/features/auth/pages/ResetPassword";
import VerifyForgetPasswordOtp from "@/features/auth/pages/VerifyForgetPasswordOtp";
import JobApplicantionDetailPage from "@/features/recruiter/pages/RecruiterJobApplicationDetailviewPage";
import MyInterviewsPage from "@/features/candidate/pages/MyInterviewsPage";
import InterviewDetailPage from "@/features/candidate/pages/InterviewDetailPage";
import LandingPage from "@/features/candidate/pages/LandingPage";
import RecruiterProfilePage from "@/features/recruiter/pages/RecruiterProfilePage";
import { CandidateApplicationDetailPage } from "@/features/candidate/pages/applicationDetailPage";
import RecruiterEditProfilePage from "@/features/recruiter/pages/RecruiterEditProfile";
import RecruitersListPage from "@/features/admin/pages/RecruiterListPage";
import AdminLayout from "@/layouts/AdminLayout";
import RecruiterDetailPage from "@/features/admin/pages/RecruiterDetailViewPage";
import CandidateListPage from "@/features/admin/pages/CandidateListPage";
import CandidateDetailPage from "@/features/admin/pages/CandidateDetailPage";
import JobsListPage from "@/features/admin/pages/AdminJobsListPage";
import AdminJobDetailPage from "@/features/admin/pages/AdminJobDetailPage";
import AdminDashboardPage from "@/features/admin/pages/AdminDashboardPage";
import { NotificationPage } from "@/features/notifications/pages/notificationPage";
import SocketTest from "@/pages/sockettest";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* ---------- Candidate Routes ---------- */}
                <Route element={<CandidateLayout />}>
                    <Route element={<ProtectedRoute role="candidate" />}>
<Route path="/socket-test" element={<SocketTest />} />
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/notifications" element={<NotificationPage />} />
                        <Route path="/jobs" element={<CandidateJobsPage />} />
                        <Route path="/applications" element={<ApplicationsPage />} />
                        <Route path="/applications/:applicationId" element={<CandidateApplicationDetailPage />} />
                        <Route path="/profile" element={<CandidateProfilePage />} />
                        <Route path="/edit-profile" element={<EditProfilePage />} />
                        <Route path="/interviews" element={<MyInterviewsPage/>} />
                        <Route path="/interviews/:interviewId" element={<InterviewDetailPage/>} />


                    </Route>
                </Route>

                {/* ---------- Recruiter Routes ---------- */}
                <Route path="/recruiter" element={<RecruiterLayout />}>
                    <Route element={<ProtectedRoute role="recruiter" />}>
<Route path="socket-test" element={<SocketTest />} />

                        <Route index element={<RecruiterDashboard />} />
                        <Route path="notifications" element={<NotificationPage />} />
                        <Route path="profile" element={<RecruiterProfilePage />} />
                        <Route path="profile/edit" element={< RecruiterEditProfilePage/>} />
                        <Route path="jobs" element={<RecruiterJobsPage />} />
                        <Route path="jobs/:jobId/applicants" element={<JobApplicantsPage />} />
                        <Route path="jobs/:jobId/applicants/:applicationId" element={<JobApplicantionDetailPage />} />
                        <Route path="applicants" element={<RecruiterApplicantionsPage/>} />
                        <Route path="applicants/:applicationId" element={<ApplicantDetailsPage />} />
                        <Route path="candidates/:candidateId" element={< RecruiterCandidateProfilePage />} />
                        <Route path="interviews" element={<RecruiterInterviewsPage/>}/>
                        <Route path="interviews/:interviewId" element={<RecruiterInterviewDetailsPage/>}/>

                    </Route>
                </Route>
{/* -------------------Admin Routes----------------------------------- */}
                <Route path="/admin" element={<AdminLayout />}>
                    <Route element={<ProtectedRoute role="admin" />}>
                    <Route index element={<AdminDashboardPage />} />
                        <Route path="recruiters" element={<RecruitersListPage />} />
                        <Route path="recruiters/:id" element={<RecruiterDetailPage />} />
                        <Route path="candidates" element={<CandidateListPage />} />
                        <Route path="candidates/:id" element={<CandidateDetailPage/>} />
                         <Route path="jobs" element={<JobsListPage />} />
                        <Route path="jobs/:id" element={<AdminJobDetailPage/>} />



                    </Route>
                </Route>

                {/* ---------- Auth Routes ---------- */}
                <Route element={<PublicRoute />}>
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />
                    <Route path="/auth/verify-otp" element={<VerifyRegisterOtp/>}/>
                    <Route path="/auth/forget-password" element ={<VerifyForgetPasswordOtp/>}/>
                    <Route path="/auth/reset-password" element={<ResetPassword/>}/>
                </Route>
                
                {/* 404 */}
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />

            </Routes>
        </BrowserRouter>
    );
}
