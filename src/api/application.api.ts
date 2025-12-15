import type { ApplyJobDTO } from "@/features/candidate/types/application.types"
import api from "./apiClient"
import type { ApplicationStatus } from "@/features/recruiter/types/applicant.types"

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

export const recruiterGetApplicantDetailsApi=async(applicantionId:string)=>{
    const res=await api.get(`/application/${applicantionId}`)
    return res.data
}

export const RecruiterUpdateApplicationStatusApi=async({applicationId,status}:{applicationId?:string,status:ApplicationStatus})=>{
  
    const res=await api.patch(`/application/${applicationId}/status`,{status});
    return res.data
}