import { blockRecruiterApi, unblockRecruiterApi } from "@/api/admin.api"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { QUERY_KEYS } from "@/config/queryKeys"

export function useRecruiterStatusAction() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      recruiterId,
      currentStatus,
      reason,
    }: {
      recruiterId: string
      currentStatus: "active" | "blocked"
      reason: string
    }) => {
      if (currentStatus === "active") {
       
        if (!reason) {
          throw new Error("Reason is required to block recruiter")
        }

        return blockRecruiterApi(recruiterId,reason)
      }

      return unblockRecruiterApi(recruiterId)
    },
     onSuccess: (_, variables) => {
      const { recruiterId, currentStatus } = variables
     
      toast.success(
        currentStatus === "active"
          ? "Recruiter blocked successfully"
          : "Recruiter unblocked successfully"
      )

     queryClient.invalidateQueries({
  queryKey: QUERY_KEYS.admin.dashboard,
})
queryClient.invalidateQueries({
  queryKey:["admin","recruiters"]
})
      queryClient.invalidateQueries({
        queryKey: ["admin", "recruiter", recruiterId],
      })
    },

    onError: handleRQError,
  })
}
