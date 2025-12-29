import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  blockJobApi,
  unblockJobApi,
} from "@/api/admin.api"

type JobStatus = "active" | "blocked" | "closed"

export function useAdminJobStatusAction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      jobId,
      currentStatus,
      reason,
    }: {
      jobId: string
      currentStatus: JobStatus
      reason?: string
    }) => {
      // ✅ Admin rules ONLY
      if (currentStatus === "active" || currentStatus === "closed") {
        if (!reason) {
          throw new Error("Reason is required to block job")
        }
        return blockJobApi(jobId,reason)
      }

      if (currentStatus === "blocked") {
        return unblockJobApi(jobId)
      }

      throw new Error("Invalid admin job action")
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "jobs"],
      })
    },
  })
}
