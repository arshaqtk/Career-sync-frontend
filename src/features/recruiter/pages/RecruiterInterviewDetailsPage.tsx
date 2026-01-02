import { useParams } from "react-router-dom";
import { useRecruiterInterviewDetail } from "../hooks/useRecruiterInterviewDetails";
import { InterviewHeader } from "../components/interview/details/InterviewHeader";
import { InterviewOverview } from "../components/interview/details/InterviewOverview";
import { InterviewScheduleSection } from "../components/interview/details/InterviewScheduleSection";
import { InterviewTimeline } from "../components/interview/details/InterviewTimeline";
import { InterviewActionsPanel } from "../components/interview/details/InterviewActionsPanel";
// import { InterviewNotes } from "../components/interview/details/InterviewNotes";
import { useRecruiterUpdateInterviewStatus } from "../hooks/useRecruiterUpdateInterviewStatus";
import { InterviewStatusDialog } from "../components/modals/InterviewStatusDialog"; 
import { useUpdateInterviewStatusStore } from "../store/interviewUpdateStatusDialog.store";
import type { UpdateStatusPayloadDto } from "../dto/interview";
import { ScheduleInterviewModal } from "../components/modals/scheduleInterview.modal";
import { useInterviewScheduleModalStore } from "../store/interviewScheduleModal.store";
import { useScheduleInterview } from "../hooks/useRecruiterScheduleInterview";
import type { ScheduleInterviewPayload } from "../types/scheduledInterview.types";
import { toast } from "sonner";
import { useRescheduleInterview } from "../hooks/useRecruiterRescheduleInterview";
import { SectionSkeleton } from "@/components/Loaders";
import { BlockingLoader } from "@/components/Loaders/BlockingLoader";




export default function RecruiterInterviewDetailsPage() {
  const { interviewId } = useParams<{ interviewId: string }>();

  const { data: interview, isLoading } = useRecruiterInterviewDetail(interviewId!);
const {selectedInterview}=useInterviewScheduleModalStore()
  const{mutate:updateInterviewStatus,isPending} =useRecruiterUpdateInterviewStatus()
const { mutate: scheduleInterview, isPending: isScheduling } =
  useScheduleInterview()

const { mutate: rescheduleInterview, isPending: isRescheduling } =useRescheduleInterview()

  //-------------------Modal--stores------------------------
  const interviewStatusStore=useUpdateInterviewStatusStore()
  const interviewScheduleModalStore=useInterviewScheduleModalStore()


  if (isLoading) return <SectionSkeleton/>
  if (!interview) return <p>Interview not found</p>;


//handle complete and cancel
const handleConfirm = ({ status, notes,roundNumber}: UpdateStatusPayloadDto) => {
  if(interviewId){
    updateInterviewStatus({interviewId,payload:{status,notes,roundNumber}})
  }
};


const handleScheduleSubmit = (
  data: Omit<ScheduleInterviewPayload, "scheduleMode">
) => {
  if (!interview.data.applicationId) {
    toast.error("Something went wrong")
    return
  }

  if (interviewScheduleModalStore.mode === "reschedule") {
    if (!selectedInterview?._id) {
      toast.error("Interview not found")
      return
    }

    rescheduleInterview({
      interviewId: selectedInterview._id,
      payload: data,
    })

    return
  }

 
  scheduleInterview({
    ...data,
    applicationId: interview.data.applicationId,
    scheduleMode: "next_round",
  })
}

console.log(interview)


  return (
    <div className="space-y-6">
      <BlockingLoader
        show={isPending}
        message="Updating interview..."
      />
      <InterviewHeader interview={interview.data} />
      <ScheduleInterviewModal
              isPending={isScheduling||isRescheduling}
                    open={interviewScheduleModalStore.open}
                    onClose={interviewScheduleModalStore.closeModal}
                    defaultValues={interviewScheduleModalStore.selectedInterview}
                    onSubmit={(data) => {
                      handleScheduleSubmit(data)
                    }}
                  />

      {interviewStatusStore.isOpen && interviewStatusStore.status && (
       <InterviewStatusDialog
    open={interviewStatusStore.isOpen} 
    onClose={() => interviewStatusStore.closeModal()}
    status={interviewStatusStore.status}
    roundNumber={interviewStatusStore.roundNumber}
    onConfirm={handleConfirm}
  />)}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <InterviewOverview interview={interview.data} />
          <InterviewScheduleSection interview={interview.data} />
          <InterviewTimeline timeline={interview.data.statusHistory} currentStatus={interview.data.status} />
          {/* <InterviewNotes interviewId={interview.data._id} notes={interview.data.notes} /> */}
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-1">
          <InterviewActionsPanel interview={interview.data} />
        </div>
      </div>
    </div>
  );
}
