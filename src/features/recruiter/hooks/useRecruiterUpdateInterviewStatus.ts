import { useMutation, useQueryClient } from "@tanstack/react-query"
import {  recruiterUpdateInterviewStatusApi } from "@/api/interview.api"
import { toast } from "sonner"
import { QUERY_KEYS } from "@/config/queryKeys"
import type { InterviewStatus } from "../interview/types/interview.type"

type Response = {
  message: string
}
type UpdateStatusPayloadDto={
    status:InterviewStatus,
    notes?:string
}


export const useRecruiterUpdateInterviewStatus = () => {
  const queryClient = useQueryClient()

  return useMutation<
    Response,
    unknown,
    { interviewId: string; payload:UpdateStatusPayloadDto  }
  >({
    mutationFn: ({ interviewId, payload }) =>
      recruiterUpdateInterviewStatusApi({ interviewId, payload }),

    onError: () => {
      toast.error("Interview update failed")
    },

    onSuccess: (data, variables) => {
      toast.success(data?.message || "Interview updated")

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.interviews.detail(variables.interviewId),
      })
    },
  })
}
