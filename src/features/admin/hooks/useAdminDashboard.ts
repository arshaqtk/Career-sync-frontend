import { getAdminDashboardApi } from "@/api/admin.api"
import { QUERY_KEYS } from "@/config/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: QUERY_KEYS.admin.dashboard,
    queryFn: getAdminDashboardApi,
    staleTime: 1000 * 60 * 5,
  })
}
