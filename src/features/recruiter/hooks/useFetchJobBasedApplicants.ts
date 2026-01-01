import { recruiterJobApplicationsApi } from "@/api/application.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useRecruiterJobApplications(jobId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.applications.byJob(jobId as string),

    queryFn: () => recruiterJobApplicationsApi(jobId as string),

    enabled: !!jobId, 
    staleTime: 1000 * 60, 
  });
}
