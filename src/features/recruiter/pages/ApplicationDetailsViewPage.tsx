import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecruiterApplicationDetails } from "../hooks/useGetApplicantDetails";

import { CandidateProfileCard } from "../components/application/CandidateProfileCard";
import { JobInfoCard } from "../components/application/JobInfoCard";
import { ResumeModal } from "../components/modals/resumeModal";


import { RecruiterActions } from "../components/application/recruiterAction";
import { InterviewTimeline } from "../components/application/interviewTimeLine";
import { useRecruiterInterviewTimeline } from "../hooks/useRecruiterApplicationInterviews";
import { toast } from "sonner";
import { ApplicationDetailSkeleton } from "@/components/Loaders";
import { handleRQError } from "@/lib/react-query/errorHandler";
import { Button } from "@/components/ui/shadcn/button";
import { ArrowLeft, FileText, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { ScheduleInterviewModal } from "../components/modals/scheduleInterview.modal";
import { useInterviewScheduleModalStore } from "../store/interviewScheduleModal.store";
import { useScheduleInterview } from "../hooks/useRecruiterScheduleInterview";
import type { ScheduleInterviewPayload } from "../types/scheduledInterview.types";
import { RecruiterFinalizeApplicationActions } from "../components/application/FinalizeApplicationAction";
import { ApplicationInfoCard } from "../components/application/ApplicationInfoCard";

export default function ApplicantionDetailPage() {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  if (!applicationId) {
    toast.error("Something went wrong...")
  }

  const { data, isLoading, error } = useRecruiterApplicationDetails(applicationId);
  const { data: interviews, isLoading: interviewIsLoading, error: timeLineError } = useRecruiterInterviewTimeline(applicationId!)
  const { closeModal, open } = useInterviewScheduleModalStore();
  const { mutate: scheduleInterview, isPending: isScheduling } = useScheduleInterview();

  useEffect(() => {
    if (error) handleRQError(error);
    if (timeLineError) handleRQError(timeLineError);
  }, [error, timeLineError]);

  if (isLoading || interviewIsLoading) return <ApplicationDetailSkeleton />

  if (!data) return <p className="p-10 text-center text-gray-500">No application found.</p>;

  const handleScheduleSubmit = (data: Omit<ScheduleInterviewPayload, "scheduleMode">) => {
    if (applicationId) {
      scheduleInterview({ ...data, scheduleMode: "initial", applicationId }, {
        onSuccess: () => {
          toast.success("Interview scheduled successfully");
          closeModal();
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="h-9 w-9 p-0 hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Application Details</h1>
            <p className="text-sm text-muted-foreground font-medium">Reviewing candidate for {data.jobId?.title}</p>
          </div>
        </div>
      </div>

      <ScheduleInterviewModal
        isPending={isScheduling}
        open={open}
        onClose={closeModal}
        onSubmit={handleScheduleSubmit}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Candidate Profile */}
          <CandidateProfileCard candidate={data.candidateId} />

<ApplicationInfoCard application={data} />
          {/* Interview Timeline */}
          <Card className="bg-card border border-border shadow-sm overflow-hidden">
            <CardHeader className="border-b border-border py-4">
              <CardTitle className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Interview Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <InterviewTimeline interviews={interviews.data} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          {/* Job Information */}
          <JobInfoCard job={data.jobId} />

          {/* Actions Card */}
          <Card className="bg-card border border-border shadow-sm overflow-hidden">
            <CardHeader className="border-b border-border py-4">
              <CardTitle className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Application Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Documents</p>
                <ResumeModal resumeKey={data.resumeUrl} applicationId={applicationId!} />
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status & Scheduling</p>
                <RecruiterActions applicationId={applicationId!} currentStatus={data.status} />
              </div>

              <div className="pt-6 border-t border-border space-y-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Final Decision</p>
                <RecruiterFinalizeApplicationActions applicationId={applicationId!} currentStatus={data.status} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
