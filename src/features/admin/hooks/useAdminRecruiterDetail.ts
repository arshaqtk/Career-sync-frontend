import { useQuery } from "@tanstack/react-query"
import { getRecruiterDetailApi } from "@/api/admin.api"

export function useAdminRecruiterDetail(id: string) {
  return useQuery({
    queryKey: ["admin", "recruiter", id],
    queryFn: () => getRecruiterDetailApi(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}