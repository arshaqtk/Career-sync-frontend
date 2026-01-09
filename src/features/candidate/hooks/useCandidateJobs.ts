import { fetchAllJobs } from "@/api/job.api";
import { useQuery,keepPreviousData  } from "@tanstack/react-query";
import type { JobFilters } from "../types/jobFilter.types";

export default function useCandidateJobData({
  page,
  limit,
  filters,
}: {
  page: number;
  limit: number;
  filters: JobFilters;
}) {
  return useQuery({
    queryKey: [
      "jobs",
      page,
      limit,
      filters.field,
      filters.status,
      filters.jobType,
      filters.search,
      filters.location,
    ],
    queryFn: () =>
      fetchAllJobs({
        page,
        limit,
        filters,
      }),
   placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
