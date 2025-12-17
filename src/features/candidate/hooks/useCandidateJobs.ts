import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "../../../config/queryKeys"
import { fetchAllJobs } from "@/api/job.api"
import type { JobFilters } from "../types/jobFilter.types";


export default function useCandidateJobData({ page, limit,filters }: {
    page: number;
    limit: number;
    filters:JobFilters
}) {
    return useQuery({
        queryKey: QUERY_KEYS.jobs.list({
            page,
            limit,
            filters
        }),
        queryFn: () => fetchAllJobs({
            page,
            limit,
            filters
        }),
        placeholderData: (previousData) => previousData,
        staleTime: 1000 * 60 * 5,
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: true
    })
}