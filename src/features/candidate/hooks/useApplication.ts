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

const ErrorHandler = (error: unknown) => {
  type ErrorWithResponse = {
    response?: {
      status?: number;
      data?: {
        message?: string;
      };
    };
  };

  //  if it's an Axios/React Query error
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const err = error as ErrorWithResponse;

    const statusCode = err.response?.status;
    const message = err.response?.data?.message;

    console.log("RQ ERROR:", err.response);

    // ====== CHECK FOR INTERNAL SERVER ERROR ======
    if (statusCode === 500) {
      toast.error("Something went wrong. Please try again later.");
      return;
    }

    // ====== CLIENT ERRORS (SHOW REAL MESSAGE) ======
    if (message) {
      toast.error(message);
      return;
    }

    // Default fallback
    toast.error("An unexpected error occurred.");
  } else {
    // Non-axios or unknown error
    console.log("Unknown Error:", error);
    toast.error("An unexpected error occurred.");
  }
};
