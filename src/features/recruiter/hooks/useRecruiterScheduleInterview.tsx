import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useInterviewScheduleModalStore } from "../store/interviewScheduleModal.store"
import { recruiterScheduleInterviewApi } from "@/api/interview.api"
import { toast } from "sonner"
import { QUERY_KEYS } from "@/config/queryKeys"
import type { ScheduleInterviewPayload } from "../types/scheduledInterview.types"

type ScheduleInterviewResponse = {
  message: string
}

export const useScheduleInterview = () => {
  const queryClient = useQueryClient()
  const { closeModal } = useInterviewScheduleModalStore()

  return useMutation<
    ScheduleInterviewResponse,
    unknown,
    { applicationId: string; payload: ScheduleInterviewPayload }
  >({
    mutationFn: ({ applicationId, payload }) =>
      recruiterScheduleInterviewApi({ applicationId, payload }),

    onError: () => {
      toast.error("Interview update failed")
    },

    onSuccess: (data, variables) => {
      closeModal()
      toast.success(data?.message || "Interview updated")

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.applications.detail(variables.applicationId),
      })
    },
  })
}
