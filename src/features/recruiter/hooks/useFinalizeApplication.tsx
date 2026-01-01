import { RecruiterFinalizeApplicationStatusApi } from "@/api/application.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";
import type {  SelectedOrRejected } from "../types/applicationStatus.types";
import type { RecruiterApplicationDTO } from "../types/application.dto";
type UpdateApplicationResponse = {
  message: string;
  data:RecruiterApplicationDTO
};
export const useFinalizeApplicantStatus=()=>{
    const queryClient=useQueryClient();
    return useMutation<UpdateApplicationResponse,unknown,{applicationId:string,status:SelectedOrRejected,note:string}>({
      
        mutationFn:async({applicationId,status,note})=>RecruiterFinalizeApplicationStatusApi({applicationId,status,note}),
         onError:()=>{
            toast.error("Status updation failed")
        },
        onSuccess:(data,Variable)=>{
            const {applicationId,status }=Variable
            toast.success(data?.message || "Status updated")
             queryClient.setQueryData(
    QUERY_KEYS.applications.detail(applicationId),
    (old: RecruiterApplicationDTO) => {
      if (!old) return old;
      return {
        ...old,
        status,
      };
    }
  );
        }
    })
    
    }
