import type { ApplyJobDTO } from "@/features/candidate/types/application.types"
import api from "./apiClient"

export const applyToJobApi=async(data:ApplyJobDTO)=>{
    const res=await api.post("/application/apply",data)
    return res.data
}

export const candidateApplications=async()=>{
    const res=await api.get("/application/my")
    return res.data
}


export const recruiterJobApplicationsApi=async(jobId:string)=>{
    const res=await api.get(`/application/job/${jobId}`)
    console.log(res.data)
    return res.data
}