import { useParams, useNavigate } from "react-router-dom";
import { useRecruiterApplicationDetails } from "../hooks/useGetApplicantDetails";

import { CandidateProfileCard } from "../components/application/CandidateProfileCard";
import { JobInfoCard } from "../components/application/JobInfoCard";
import { ApplicationInfoCard } from "../components/application/ApplicationInfoCard";
import { ResumeModal } from "../components/modals/resumeModal";
import { RecruiterActions } from "../components/application/recruiterAction";
import { ScheduleInterviewModal } from "../components/modals/scheduleInterview.modal";
import { useInterviewScheduleModalStore } from "../store/interviewScheduleModal.store";
import type { ScheduleInterviewPayload } from "../types/scheduledInterview.types";
import { useScheduleInterview } from "../hooks/useRecruiterScheduleInterview";
import { RecruiterFinalizeApplicationActions } from "../components/application/FinalizeApplicationAction";
import { toast } from "sonner";
import { SectionSkeleton } from "@/components/Loaders";
import { handleRQError } from "@/lib/react-query/errorHandler";
import { Button } from "@/components/ui/shadcn/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";

export default function JobApplicantionDetailPage() {
  const { applicationId, jobId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useRecruiterApplicationDetails(applicationId!);
  const { closeModal, open } = useInterviewScheduleModalStore();
  const { mutate: scheduleInterview, isPending } = useScheduleInterview();

  if (isLoading) return <SectionSkeleton />;
  if (!data) return <p className="p-10 text-center text-gray-500">No application found.</p>;
  if (error) handleRQError(error);

  const handleScheduleSubmit = (data: Omit<ScheduleInterviewPayload, "scheduleMode">) => {
    if (applicationId) {
      scheduleInterview({ ...data, scheduleMode: "initial", applicationId }, {
        onSuccess: () => {
          toast.success("Interview scheduled successfully");
          closeModal();
        }
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Header */}
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/recruiter/jobs/${jobId}/applicants`)}
            className="h-9 w-9 p-0 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applicant Details</h1>
            <p className="text-sm text-gray-500 font-medium">Managing application for {data.jobId?.title}</p>
          </div>
        </div>
      </div>

      <ScheduleInterviewModal
        isPending={isPending}
        open={open}
        onClose={closeModal}
        onSubmit={(data) => {
          handleScheduleSubmit(data);
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Candidate Profile */}
          <CandidateProfileCard candidate={data.candidateId} />

          {/* Application Info */}
          <ApplicationInfoCard application={data} />
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          {/* Job Information */}
          <JobInfoCard job={data.jobId} />

          {/* Actions Card */}
          <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
              <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Application Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Documents</p>
                <ResumeModal directUrl={data.resumeUrl} />
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</p>
                <RecruiterActions applicationId={applicationId!} currentStatus={data.status} />
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Final Decision</p>
                <RecruiterFinalizeApplicationActions applicationId={applicationId!} currentStatus={data.status} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
