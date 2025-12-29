import { applyToJobApi, candidateApplications } from "@/api/application.api"
import { QUERY_KEYS } from "@/config/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { ApplicationFilters } from "../types/applicationFilter.types"
import { handleRQError } from "@/lib/react-query/errorHandler"


export const useApplicationData=({filters,candidateId}:{filters:ApplicationFilters,candidateId:string})=>{
    return useQuery({

        queryKey: QUERY_KEYS.applications.byCandidate(candidateId,filters),
        queryFn:()=>candidateApplications({filters}),
        staleTime: 1000 * 60 * 5,
        retry:1,
        refetchOnWindowFocus:false,
        refetchOnMount:true,
        refetchOnReconnect:false
    })
}
export const useApplyNow=()=>{
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:applyToJobApi,
        onSuccess:(response)=>{
            console.log(response)
            toast.success(response.message)            
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.jobs]});
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.applications]});
        },
         onError(error: unknown) {handleRQError(error)}
    })
}
