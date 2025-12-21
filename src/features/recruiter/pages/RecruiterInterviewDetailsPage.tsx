import { useParams } from "react-router-dom";
import { useRecruiterInterviewDetail } from "../hooks/useRecruiterInterviewDetails";
import { InterviewHeader } from "../components/interview/details/InterviewHeader";
import { InterviewOverview } from "../components/interview/details/InterviewOverview";
import { InterviewScheduleSection } from "../components/interview/details/InterviewScheduleSection";
import { InterviewTimeline } from "../components/interview/details/InterviewTimeline";
import { InterviewActionsPanel } from "../components/interview/details/InterviewActionsPanel";
import { InterviewNotes } from "../components/interview/details/InterviewNotes";
import { useRecruiterUpdateInterviewStatus } from "../hooks/useRecruiterUpdateInterviewStatus";
import { InterviewStatusDialog } from "../components/modals/InterviewStatusDialog"; 
import { useUpdateInterviewStatusStore } from "../store/interviewUpdateStatusDialog.store";
import type { UpdateStatusPayloadDto } from "../dto/interview";
// import { ScheduleInterviewModal } from "../../components/modals/scheduleInterview.modal";
// import { useInterviewScheduleModalStore } from "../../store/interviewScheduleModal.store";




export default function RecruiterInterviewDetailsPage() {
  const { interviewId } = useParams<{ interviewId: string }>();

  const { data: interview, isLoading } = useRecruiterInterviewDetail(interviewId!);
  const{mutate:updateInterviewStatus} =useRecruiterUpdateInterviewStatus()
  const {isOpen,closeModal,status,roundNumber}=useUpdateInterviewStatusStore()

  if (isLoading) return <p>Loading...</p>;
  if (!interview) return <p>Interview not found</p>;



const handleConfirm = ({ status, notes,roundNumber}: UpdateStatusPayloadDto) => {
  if(interviewId){
    updateInterviewStatus({interviewId,payload:{status,notes,roundNumber}})
  }
  

  // Example API payload
  // updateInterviewStatus(interviewId, {
  //   status: action === "cancel" ? "CANCELLED" : "COMPLETED",
  //   remark,
  // });
};



  return (
    <div className="space-y-6">
      <InterviewHeader interview={interview.data} />
      {/* <ScheduleInterviewModal
        open={isOpen}
        onClose={closeModal}
        onSubmit={(data) => {
          handleScheduleSubmit(data)
        }}
      /> */}
      {isOpen && status && (
       <InterviewStatusDialog
    open={isOpen} 
    onClose={() => closeModal()}
    status={status}
    roundNumber={roundNumber}
    onConfirm={handleConfirm}
  />)}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <InterviewOverview interview={interview.data} />
          <InterviewScheduleSection interview={interview.data} />
          <InterviewTimeline timeline={interview.data.statusHistory} currentStatus={interview.data.status} />
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
