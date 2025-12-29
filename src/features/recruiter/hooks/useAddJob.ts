import { RecruiterAddJobApi } from "@/api/job.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import type { Job } from "@/types/job.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useJobModalStore } from "../store/openJobModalStore";

type AddJobResponse = {
  message: string;
  job: Job;
};

export const useAddJob = () => {
  const queryClient = useQueryClient();
  const { closeModal } = useJobModalStore();

  return useMutation<AddJobResponse, unknown, { data: Job }>({
    mutationFn: ({ data }) => RecruiterAddJobApi({ data }),

    onSuccess: (res) => {
      closeModal();
      toast.success(res.message || "Job added");

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.jobs.all,
      });
    },

    onError: () => {
      toast.error("Error occurred");
    },
  });
};
