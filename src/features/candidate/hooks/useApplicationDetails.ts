import { candidateApplicationDetailViewApi } from "@/api/application.api"
import { QUERY_KEYS } from "@/config/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useApplicationDetailViewData=(applicationId:string)=>{
    return useQuery({

        queryKey: QUERY_KEYS.applications.detail(applicationId),
        queryFn:()=>candidateApplicationDetailViewApi({applicationId}),
        staleTime: 1000 * 60 * 5,
        retry:1,
        refetchOnWindowFocus:false,
        refetchOnMount:true,
        refetchOnReconnect:false
    })
}