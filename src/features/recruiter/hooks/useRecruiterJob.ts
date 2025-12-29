import {  useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/config/queryKeys"
import { RecruiterJobs } from "@/api/job.api"
import type { JobFilters } from "../types/jobFilter.types";
import type { RecruiterJobsResponse } from "../types/jobResponse";

export default function useRecruiterJob({ page, limit,filters }: {
    page: number;
    limit: number;
    filters:JobFilters
}){
     console.log("page inside hook:", page);
    
    return useQuery<RecruiterJobsResponse>({
        queryKey: [QUERY_KEYS.jobs.list({
            page,
            limit,
            filters
        })],
        queryFn:()=>RecruiterJobs({
            page,
            limit,
            filters
        }),
        placeholderData: (previousData) => previousData,
         staleTime: 1000 * 60 * 5,
          refetchOnWindowFocus:false, 
          refetchOnReconnect:false,
          refetchOnMount:true
    })
}