import {  useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/config/queryKeys"
import { recruiterGetAllApplicationsApi } from "@/api/recruiter.api"

export default function useRecruiterFetchApplications(){
    return useQuery({
        queryKey: QUERY_KEYS.applications.all,
        queryFn:recruiterGetAllApplicationsApi,
         staleTime: 1000 * 60 * 5,
          retry: 1,
          refetchOnWindowFocus:false, 
          refetchOnReconnect:false,
          refetchOnMount:true
    })
}