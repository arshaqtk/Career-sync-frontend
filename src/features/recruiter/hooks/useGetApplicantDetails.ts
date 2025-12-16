import { recruiterGetApplicantDetailsApi } from "@/api/application.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import { useQuery } from "@tanstack/react-query";

export function useRecruiterApplicantDetails(applicationId?: string) {
  return useQuery({
    queryKey: QUERY_KEYS.applications.detail(applicationId as string),

    queryFn: () =>
      recruiterGetApplicantDetailsApi(applicationId as string),

    enabled: !!applicationId, // 🛑 critical safety check

    staleTime: 1000 * 60 * 5, // 5 minutes

    retry: 1,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: true,
  });
}
