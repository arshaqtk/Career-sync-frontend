import {  useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "./queryKeys"
import { fetchAllJobs } from "@/api/job.api"

export default function useCandidateJobData(){
    return useQuery({
        queryKey: [QUERY_KEYS.jobs],
        queryFn:fetchAllJobs,
         staleTime: 1000 * 60 * 5,
          retry: 1,
          refetchOnWindowFocus:false, 
          refetchOnReconnect:false,
          refetchOnMount:true
    })
}