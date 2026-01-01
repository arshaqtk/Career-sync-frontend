import { getCandidateProfileStatsApi } from "@/api/profile.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCandidateProfileStats(){
  return useQuery({
    //change it 
    queryKey: QUERY_KEYS.user.ProfileStats,
    queryFn: getCandidateProfileStatsApi,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  })
}
