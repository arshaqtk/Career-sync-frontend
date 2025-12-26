import { fetchProfile } from "@/api/profile.api"
import {  useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../config/queryKeys";


export default function useFetchRecruiterProfile(){
   
    return useQuery({
        queryKey: [QUERY_KEYS.recruiter.profile],
        queryFn:fetchProfile,
         staleTime: 1000 * 60 * 5,
          retry: 1,
          refetchOnWindowFocus:false, 
          refetchOnReconnect:false,
          refetchOnMount:true
    })
    
}

