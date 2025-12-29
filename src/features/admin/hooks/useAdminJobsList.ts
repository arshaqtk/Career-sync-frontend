import { useQuery } from "@tanstack/react-query"
import { AdmingetJobsListApi } from "@/api/admin.api"

export function useAdminJobsList(params?: {
  page?: number
  limit?: number
  status?: "active" | "blocked" | "closed" | "all"
  search?: string
}) {
  return useQuery({
    queryKey: ["admin", "jobs", params],
    queryFn: () => AdmingetJobsListApi(params),
     placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  })
}
