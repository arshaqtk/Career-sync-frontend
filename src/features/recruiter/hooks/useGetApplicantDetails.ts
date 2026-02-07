import { recruiterGetApplicationDetailsApi } from "@/api/application.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useRecruiterApplicationDetails(applicationId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.applications.detail(applicationId as string),

    queryFn: () =>
      recruiterGetApplicationDetailsApi(applicationId as string),

    enabled: !!applicationId, 

    staleTime: 1000 * 60 * 5, 

    retry: 1,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });
}
