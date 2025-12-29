import { useQuery } from "@tanstack/react-query"
import { candidateGetInterviewsApi } from "@/api/interview.api"

export const useCandidateInterviews = () => {
  return useQuery({
    queryKey: ["candidate-interviews"],
    queryFn: candidateGetInterviewsApi,

  })
}
