import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateRecruiterCompanyApi } from "@/api/recruiter.api"
import { toast } from "sonner"
import { QUERY_KEYS } from "@/config/queryKeys"
import { handleRQError } from "@/lib/react-query/errorHandler"

export function useUpdateRecruiterCompany() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateRecruiterCompanyApi,

    onSuccess: () => {
      toast.success("Company details updated successfully")
      queryClient.invalidateQueries({queryKey:[QUERY_KEYS.recruiter.profile]})
    //  queryClient.setQueryData(QUERY_KEYS.recruiter.profile(), updatedUser)
    },

    onError: (error) => handleRQError(error)
  })
}
