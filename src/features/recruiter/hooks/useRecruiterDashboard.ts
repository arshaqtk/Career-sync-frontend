import { useQuery } from "@tanstack/react-query"
import { fetchRecruiterDashboardApi } from "@/api/recruiterDashboard.api"

export const useRecruiterDashboard = () => {
  return useQuery({
    queryKey: ["recruiter-dashboard"],
    queryFn: fetchRecruiterDashboardApi,
    staleTime: 1000 * 60 * 5,
  })
}
