import { RecruiterUpdateApplicationStatusApi } from "@/api/application.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import type { ApplicationStatus } from "../types/applicant.types";
type UpdateApplicationResponse = {
  message: string;
};
export const useUpdateApplicantStatus=()=>{
    const queryClient=useQueryClient();
    return useMutation<UpdateApplicationResponse,unknown,{applicationId:string,status:ApplicationStatus}>({
        mutationFn:async({applicationId,status})=>RecruiterUpdateApplicationStatusApi({applicationId,status}),
         onError:()=>{
            toast.error("Status updation failed")
        },
        onSuccess:(data)=>{
            toast.success(data?.message || "Status updated")
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.applications]})
        }
    })
    
    }
