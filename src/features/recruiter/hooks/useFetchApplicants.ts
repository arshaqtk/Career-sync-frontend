import { recruiterJobApplicationsApi } from "@/api/application.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import { useQuery } from "@tanstack/react-query";

export default function useRecruiterApplicationsData(){
    return useQuery({
        queryKey: [QUERY_KEYS.applications],
        queryFn:(jobId:string)=>recruiterJobApplicationsApi(jobId),
         staleTime: 1000 * 60 * 5,
          retry: 1,
          refetchOnWindowFocus:false, 
          refetchOnReconnect:false,
          refetchOnMount:true
    })
}