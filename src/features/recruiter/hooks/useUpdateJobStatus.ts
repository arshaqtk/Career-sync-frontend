import { RecruiterUpdateJobStatusApi } from "@/api/job.api";
import { QUERY_KEYS } from "@/config/queryKeys";
import type { Job } from "@/features/recruiter/types/job.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
type UpdateJobResponse = {
  message: string;
};
export const useUpdateJobstatus=()=>{
    const queryClient=useQueryClient();
    return useMutation<UpdateJobResponse,unknown,{jobId:string,status:Job["status"]},{ previousJobs: unknown }>({
        mutationFn:async({jobId,status})=>RecruiterUpdateJobStatusApi({jobId,status}),
        onMutate:async({jobId,status})=>{
          const previousJobs= await queryClient.getQueryData([QUERY_KEYS.jobs]);

            queryClient.setQueryData([QUERY_KEYS.jobs],(old:{total:number,jobs:Job[]})=>{
                if(!old) return old;

                return {
                    ...old,jobs:old.jobs.map((job:Job)=>job._id===jobId?{...job,status}:job)
                }
            })
            return {previousJobs}
        },
        onError:(_err,_var,ctx)=>{
            queryClient.setQueryData([QUERY_KEYS.jobs],ctx?.previousJobs)
            toast.error("Status updation failed")
        },
        onSuccess:(data)=>{
            queryClient.invalidateQueries({queryKey:QUERY_KEYS.jobs.lists()})
            toast.success(data?.message || "Status updated")
        },
        onSettled:()=>{
            queryClient.invalidateQueries({queryKey:[QUERY_KEYS.jobs]})
        }
    })
    
}