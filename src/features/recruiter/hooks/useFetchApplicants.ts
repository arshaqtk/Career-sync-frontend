import {  useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/config/queryKeys"
import { recruiterGetAllApplicationsApi } from "@/api/recruiter.api"
import type { ApplicationFilters } from "../types/applicationFilters";

export default function useRecruiterFetchApplications({ page, limit,filters }: {
    page: number;
    limit: number;
    filters:ApplicationFilters
}){
    return useQuery({
        queryKey: QUERY_KEYS.applications.list({
            page,
            limit,
            filters
        }),
        queryFn:()=>recruiterGetAllApplicationsApi({
            page,
            limit,
            filters
        }),
         staleTime: 1000 * 60 * 5,
          retry: 1,
          refetchOnWindowFocus:false, 
          refetchOnReconnect:false,
          refetchOnMount:true
    })
}