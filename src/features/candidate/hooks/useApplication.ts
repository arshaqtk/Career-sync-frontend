import { applyToJobApi, candidateApplications } from "@/api/application.api"
import { QUERY_KEYS } from "@/config/queryKeys"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"


export const useApplicationData=()=>{
    return useQuery({
        queryKey:[QUERY_KEYS.applications],
        queryFn:candidateApplications,
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
         onError(error: unknown) { {ErrorHandler(error) } }
    })
}

const ErrorHandler=(error:unknown)=>{
             type ErrorWithResponse = {
                    response?: {
                        data?: {
                            message?: string;
                        };
                    };
                };
                if (
                    typeof error === "object" &&
                    error !== null &&
                    "response" in error &&
                    typeof (error as ErrorWithResponse).response === "object"
                ) {
                    const err = error as ErrorWithResponse;
                    console.log("RQ ERROR:", err.response?.data);
                    toast.error(err.response?.data?.message);
                } else {
                    console.log("RQ ERROR:", error);
                    toast.error("An unexpected error occurred.");
                }
        }