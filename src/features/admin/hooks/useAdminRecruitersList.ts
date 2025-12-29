import { useQuery } from "@tanstack/react-query"
import {  getRecruitersListApi } from "@/api/admin.api"

export function useAdminRecruitersList() {
  return useQuery({
    queryKey: ["admin", "recruiters"],
    queryFn: () => getRecruitersListApi(),
    staleTime: 1000 * 60 * 5,
  })
}