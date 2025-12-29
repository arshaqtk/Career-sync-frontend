import { useQuery } from "@tanstack/react-query"
import { getCandidateDetailApi } from "@/api/admin.api"

export function useAdminCandidateDetail(id: string) {
  return useQuery({
    queryKey: ["admin", "candidates", id],
    queryFn: () => getCandidateDetailApi(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}