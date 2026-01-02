import { rescheduleInterview } from "@/api/interview.api"
import { QUERY_KEYS } from "@/config/queryKeys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useInterviewScheduleModalStore } from "../store/interviewScheduleModal.store"
import { handleRQError } from "@/lib/react-query/errorHandler"

export function useRescheduleInterview() {
  const queryClient = useQueryClient()
const {closeModal}=useInterviewScheduleModalStore()
  return useMutation({
    mutationFn: rescheduleInterview,

    onSuccess: (_, variables) => {
      toast.success("Interview rescheduled")
closeModal()
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.interviews.detail(variables.interviewId),
      })
    },
    onError:(error)=>{
        closeModal()
        handleRQError(error)
  }})
}
