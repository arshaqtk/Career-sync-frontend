import { RecruiterAddJobApi } from "@/api/job.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import type { Job } from "@/types/job.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useJobModalStore } from "../store/openJobModalStore";
import useRecruiterJob from "./useRecruiterJob";
type AddJobResponse = {
  message: string;
  job:Job
};
export const useAddJob=()=>{
    const queryClient=useQueryClient();
     const { data:previousJobs } = useRecruiterJob();
    const {  closeModal } = useJobModalStore();
    return useMutation<AddJobResponse,unknown,{data:Job}>({
        mutationFn:async({data})=>RecruiterAddJobApi({data}),
        onError:()=>{
            toast.error("Error Occured")
        },
        onSuccess:(data)=>{
            closeModal()
            toast.success(data?.message || "Job updated")
            queryClient.setQueryData([QUERY_KEYS.jobs],[...previousJobs,data])
        },
    })
    
}