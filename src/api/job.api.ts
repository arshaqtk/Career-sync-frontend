import type { Job } from "@/types/job.type"
import api from "./apiClient"

//---------------------------------Candidate------------------------------------------
export const fetchAllJobs=async()=>{
     const res= await api.get("/job/jobs")
     console.log(res.data)
    return res.data
}



//-----------------------------------Recruiter----------------------------------------
export const RecruiterJobs=async()=>{
     const res= await api.get("/job/employer/jobs")
    return res.data
}
export const RecruiterUpdateJobApi=async({jobId,data}:{jobId?:string,data:Job})=>{
  
    const res=await api.put(`/job/employer/jobs/${jobId}`,data);
    return res.data
}

export const RecruiterUpdateJobStatusApi=async({jobId,status}:{jobId:string,status:Job["status"]})=>{
    const res=await api.patch(`/job/employer/jobs/${jobId}/status`,{status});
    return res.data
}