import { rescheduleInterview } from "@/api/interview.api"
import { QUERY_KEYS } from "@/config/queryKeys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export function useRescheduleInterview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: rescheduleInterview,

    onSuccess: (_, variables) => {
      toast.success("Interview rescheduled")

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.interviews.detail(variables.interviewId),
      })
    },
  })
}
