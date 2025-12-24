import { candidateGetInterviewDetailApi } from "@/api/interview.api"
import { useQuery } from "@tanstack/react-query"

export const useCandidateInterviewDetail = (interviewId: string) => {
  return useQuery({
    queryKey: ["candidate-interview", interviewId],
    queryFn: () => candidateGetInterviewDetailApi({ interviewId }),
    enabled: !!interviewId,
  })
}