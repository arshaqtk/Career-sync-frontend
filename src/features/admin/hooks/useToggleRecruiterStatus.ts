import { blockRecruiterApi, unblockRecruiterApi } from "@/api/admin.api"
import { useMutation } from "@tanstack/react-query"

export function useRecruiterStatusAction() {
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
  })
}
