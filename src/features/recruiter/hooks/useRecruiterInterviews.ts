import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { recruiterGetInterviews } from "@/api/interview.api"
import type { InterviewListFilters } from "../types/interview.type"
import { QUERY_KEYS } from "@/config/queryKeys"

export function useRecruiterInterviews(
  recruiterId: string,
  filters: InterviewListFilters
) {
  return useQuery({
    queryKey: QUERY_KEYS.interviews.listByRecruiter(
      recruiterId,
      filters
    ),
    queryFn: () =>
      recruiterGetInterviews({ params: filters }),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  })
}
