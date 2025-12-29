import { RecruiterUpdateJobApi } from "@/api/job.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import type { Job } from "@/types/job.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useJobModalStore } from "../store/openJobModalStore";
type UpdateJobResponse = {
  message: string;
};
export const useUpdateJob=()=>{
    const queryClient=useQueryClient();
    const {  closeModal } = useJobModalStore();
    return useMutation<UpdateJobResponse,unknown,{jobId?:string,data:Job}>({
        mutationFn:async({jobId,data})=>RecruiterUpdateJobApi({jobId,data}),
        onError:()=>{
            toast.error(" updation failed")
        },
        onSuccess:(data)=>{
            closeModal()
            toast.success(data?.message || "Job updated")
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.jobs.all,})
        },
    })
    
}