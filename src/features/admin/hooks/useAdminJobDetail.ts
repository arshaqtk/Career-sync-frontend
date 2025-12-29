import { useQuery } from "@tanstack/react-query"
import { AdmingetJobDetailApi } from "@/api/admin.api"

export function useAdminJobDetail(jobId: string) {
  return useQuery({
    queryKey: ["admin", "jobs", "detail", jobId],
    queryFn: () => AdmingetJobDetailApi(jobId),
    enabled: !!jobId, 
    staleTime: 1000 * 60 * 5, 
    refetchOnWindowFocus: false,
  })
}
