import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {  recruiterUpdateInterviewStatusApi } from "@/api/interview.api"
import { toast } from "sonner"
import { QUERY_KEYS } from "@/config/queryKeys"
import type { UpdateStatusPayloadDto } from "../dto/interview";


type UpdateInterviewStatusResponse = {
  message: string;
};

type UpdateInterviewStatusVariables = {
  interviewId: string;
  payload: UpdateStatusPayloadDto;
};

export const useRecruiterUpdateInterviewStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateInterviewStatusResponse,
    AxiosError<{ message?: string }>,
    UpdateInterviewStatusVariables
  >({
    mutationFn: ({ interviewId, payload }) =>
      recruiterUpdateInterviewStatusApi({ interviewId, payload }),

    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update interview");
    },

    onSuccess: (data, variables) => {
      toast.success(data.message || "Interview updated");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.interviews.detail(variables.interviewId),
      });
    },
  });
};
