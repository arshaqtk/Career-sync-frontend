import type { Job } from "@/types/job.type"
import api from "./apiClient"
import type { JobFilters } from "@/features/candidate/types/jobFilter.types";

//---------------------------------Candidate------------------------------------------
export const fetchAllJobs=async({page=1, limit=5,filters}: {
      page: number;
      limit: number;
    filters:JobFilters})=>{
        const {jobType,status,search}=filters
     const res= await api.get(`/job/jobs/?page=${page}&limit=${limit}&status=${status}&jobType=${jobType}&search=${search}`)
     console.log(res.data)
    return res.data
}

export const fetchJobSuggestions = async (query: string) => {
  if (!query) return []

  const res = await api.get("job/jobs/suggestions", {
    params: { query },
  })

  return res.data.data as string[]
}

//-----------------------------------Recruiter----------------------------------------
export const RecruiterJobs=async({page=1, limit=5,filters}: {
      page: number;
      limit: number; 
    filters:JobFilters})=>{
        const {jobType,status,search}=filters
     const res= await api.get(`/job/employer/jobs?page=${page}&limit=${limit}&status=${status}&search=${search}&jobType=${jobType}`)
    return res.data
     
}

export const RecruiterAddJobApi=async({data}:{data:Job})=>{
    const res=await api.post("/job/employer/jobs",data)
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