import { fetchProfile } from "@/api/profile.api"
import {  useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../queries/queryKeys";

export default function useCandidateData(){
    return useQuery({
        queryKey: [QUERY_KEYS.user],
        queryFn:fetchProfile,
         staleTime: 1000 * 60 * 5,
          retry: 1,
          refetchOnWindowFocus:false, 
          refetchOnReconnect:false,
          refetchOnMount:true
    })
    
}