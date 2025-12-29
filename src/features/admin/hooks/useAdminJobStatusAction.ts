
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { blockJobApi, unblockJobApi } from "@/api/admin.api"

type JobStatus = "active" | "blocked" | "closed"

interface Payload {
  jobId: string
  currentStatus: JobStatus
  reason?: string
}

export function useAdminJobStatusAction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ jobId, currentStatus, reason }: Payload) => {
    
      if (currentStatus === "active" || currentStatus === "closed") {
        if (!reason?.trim()) {
          throw new Error("Reason is required to block job")
        }
        return blockJobApi(jobId,reason)
      }

      if (currentStatus === "blocked") {
        return unblockJobApi(jobId)
      }

      throw new Error("Invalid job status action")
    },

    onSuccess: (_, variables) => {
      
      queryClient.invalidateQueries({
        queryKey: ["admin", "jobs"],
      })

      queryClient.invalidateQueries({
        queryKey: ["admin", "jobs", "detail", variables.jobId],
      })
    },
  })
}
