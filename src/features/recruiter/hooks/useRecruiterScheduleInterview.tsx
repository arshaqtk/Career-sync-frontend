import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useInterviewScheduleModalStore } from "../store/interviewScheduleModal.store"
import { createNextRound, rescheduleInterview, scheduleInitialInterview } from "@/api/interview.api"
import { toast } from "sonner"
import { QUERY_KEYS } from "@/config/queryKeys"
import type { ScheduleInterviewPayload } from "../types/scheduledInterview.types"

type ScheduleInterviewResponse = {
  message: string
}

export const useScheduleInterview = () => {
  const queryClient = useQueryClient()
  const { closeModal } = useInterviewScheduleModalStore()

 return useMutation<ScheduleInterviewResponse, Error, ScheduleInterviewPayload>({
    mutationFn: (payload: ScheduleInterviewPayload) => {
      if (payload.scheduleMode === "next_round") {
        return createNextRound({payload});
      }

      if (payload.scheduleMode === "reschedule") {
        return rescheduleInterview({payload});
      }

      return scheduleInitialInterview({payload});
    },
    onError: () => {
      toast.error("Interview update failed")
    },

    onSuccess: (data, variables) => {
      closeModal()
      toast.success(data?.message || "Interview updated")
      if(variables.applicationId){
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.applications.detail(variables.applicationId),
        })
      }
      if(variables.interviewId){
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.interviews.detail(variables.interviewId),
        })
      }
    },
  })
}
