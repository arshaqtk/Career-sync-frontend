import { useParams } from "react-router-dom";
import { useRecruiterInterviewDetail } from "../hooks/useRecruiterInterviewDetails";
import { InterviewHeader } from "../components/details/InterviewHeader";
import { InterviewOverview } from "../components/details/InterviewOverview";
import { InterviewScheduleSection } from "../components/details/InterviewScheduleSection";
import { InterviewTimeline } from "../components/details/InterviewTimeline";
import { InterviewActionsPanel } from "../components/details/InterviewActionsPanel";
import { InterviewNotes } from "../components/details/InterviewNotes";

export default function RecruiterInterviewDetailsPage() {
  const { interviewId } = useParams<{ interviewId: string }>();

  const { data:interview, isLoading } = useRecruiterInterviewDetail(interviewId!);
  
  if (isLoading) return <p>Loading...</p>;
  if (!interview) return <p>Interview not found</p>;
  

  return (
    <div className="space-y-6">
      <InterviewHeader interview={interview.data} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <InterviewOverview interview={interview.data} />
          <InterviewScheduleSection interview={interview.data} />
          <InterviewTimeline timeline={interview.data.statusHistory} />
          <InterviewNotes interviewId={interview.data._id} notes={interview.data.notes} />
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-1">
          <InterviewActionsPanel interview={interview.data} />
        </div>
      </div>
    </div>
  );
}
