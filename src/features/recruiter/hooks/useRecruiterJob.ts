import {  useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/config/queryKeys"
import { RecruiterJobs } from "@/api/job.api"

export default function useRecruiterJob(){
    return useQuery({
        queryKey: [QUERY_KEYS.jobs],
        queryFn:RecruiterJobs,
         staleTime: 1000 * 60 * 5,
          retry: 1,
          refetchOnWindowFocus:false, 
          refetchOnReconnect:false,
          refetchOnMount:true
    })
}