import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateRecruiterCompanyApi } from "@/api/recruiter.api"
import { toast } from "sonner"
import { QUERY_KEYS } from "@/config/queryKeys"

export function useUpdateRecruiterCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateRecruiterCompanyApi,

    onSuccess: (updatedUser) => {
      toast.success("Company details updated successfully")
                queryClient.setQueryData([QUERY_KEYS.user], updatedUser)
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update company details"
      )
    },
  })
}
