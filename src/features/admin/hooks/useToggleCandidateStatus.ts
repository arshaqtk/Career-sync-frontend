import { useMutation } from "@tanstack/react-query"
import {
  blockCandidateApi,
  unblockCandidateApi,
} from "@/api/admin.api"
import { handleRQError } from "@/lib/react-query/errorHandler"

export function useCandidateStatusAction() {
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
    },onError:(error: unknown)=>{handleRQError(error) }
  })
}
