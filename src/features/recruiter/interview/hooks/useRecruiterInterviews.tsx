import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { recruiterGetInterviews } from "@/api/interview.api";
import type { InterviewListFilters } from "../types/interview.type";

export function useRecruiterInterviews(params: InterviewListFilters) {
  return useQuery({
    queryKey: ["recruiter-interviews", params],
    queryFn: () => recruiterGetInterviews({params}),
     placeholderData: keepPreviousData,
     staleTime: 1000 * 60,
  });
}
