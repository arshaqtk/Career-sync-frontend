import { recruiterJobApplicationsApi } from "@/api/application.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import { useQuery } from "@tanstack/react-query";

export default function useRecruiterApplicationsData(jobId: string){
    return useQuery({
        queryKey: [QUERY_KEYS.applications,jobId],
        queryFn:({ queryKey }) => {
       const [, jobId] = queryKey; 
       return recruiterJobApplicationsApi(jobId);
    },
         staleTime: 1000 * 60 * 5,
          retry: 1,
          refetchOnWindowFocus:false, 
          refetchOnReconnect:false,
          refetchOnMount:true
    })
}