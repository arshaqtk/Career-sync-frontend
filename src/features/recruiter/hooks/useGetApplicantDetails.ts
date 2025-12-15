
import { recruiterGetApplicantDetailsApi } from "@/api/application.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import { useQuery } from "@tanstack/react-query";

export  function useGetApplicantDetails(id: string){
    return useQuery({
        queryKey: [QUERY_KEYS.applications,id],
        queryFn:({ queryKey }) => {
       const [, id] = queryKey; 
       return recruiterGetApplicantDetailsApi(id);
    },
         staleTime: 1000 * 60 * 5,
          retry: 1,
          refetchOnWindowFocus:false, 
          refetchOnReconnect:false,
          refetchOnMount:true
    })
}