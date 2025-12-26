import { fetchRecruiterProfileStatsApi } from "@/api/recruiter.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import { useQuery } from "@tanstack/react-query";

export default function useFetchRecruiterProfileStats(){
  return useQuery({
    queryKey: QUERY_KEYS.recruiter.ProfileStats,
    queryFn: fetchRecruiterProfileStatsApi,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  })
}
