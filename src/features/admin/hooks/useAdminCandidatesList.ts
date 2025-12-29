import { useQuery } from "@tanstack/react-query"
import {  getCandidatesListApi } from "@/api/admin.api"

export function useAdminCandidatesList() {
  return useQuery({
    queryKey: ["admin", "candidates"],
    queryFn: () => getCandidatesListApi(),
    staleTime: 1000 * 60 * 5,
  })
}