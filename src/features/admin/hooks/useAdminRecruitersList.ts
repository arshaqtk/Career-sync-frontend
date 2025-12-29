import { useQuery } from "@tanstack/react-query"
import { getRecruitersListApi } from "@/api/admin.api"

interface UseAdminRecruitersListParams {
  page: number
  limit: number
  status: "active" | "blocked" | "all"
  search: string
}

export function useAdminRecruitersList({
  page,
  limit,
  status,
  search,
}: UseAdminRecruitersListParams) {
  return useQuery({
    queryKey: [
      "admin",
      "recruiters",
      { page, limit, status, search },
    ],
    queryFn: () =>
      getRecruitersListApi({
        page,
        limit,
        status,
        search,
      }),
         placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  })
}
