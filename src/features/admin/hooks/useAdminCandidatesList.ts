import { useQuery } from "@tanstack/react-query"
import { getCandidatesListApi } from "@/api/admin.api"

interface UseAdminCandidatesListParams {
  page: number
  limit: number
  status: "active" | "blocked" | "all"
  search: string
}

export function useAdminCandidatesList({
  page,
  limit,
  status,
  search,
}: UseAdminCandidatesListParams) {
  return useQuery({
    queryKey: [
      "admin",
      "candidates",
      { page, limit, status, search },
    ],
    queryFn: () =>
      getCandidatesListApi({
        page,
        limit,
        status,
        search,
      }),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60 * 5,
  })
}
