import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  blockCandidateApi,
  unblockCandidateApi,
} from "@/api/admin.api"
import { handleRQError } from "@/lib/react-query/errorHandler"

export function useCandidateStatusAction() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      candidateId,
      currentStatus,
      reason,
    }: {
      candidateId: string
      currentStatus: "active" | "blocked"
      reason: string
    }) => {
      if (currentStatus === "active") {
        if (!reason) {
          throw new Error("Reason is required")
        }
        return blockCandidateApi(candidateId, reason )
      }

      return unblockCandidateApi(candidateId)
    }, onSuccess: (_, variables) => {
      const { candidateId } = variables

      
      queryClient.invalidateQueries({
        queryKey: ["admin", "candidates"],
      })

      
      queryClient.invalidateQueries({
        queryKey: ["admin", "candidates", candidateId],
      })
    },
    onError:(error: unknown)=>{handleRQError(error) }
  })
}
