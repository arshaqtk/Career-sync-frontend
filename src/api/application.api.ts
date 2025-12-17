import type { ApplyJobDTO } from "@/features/candidate/types/application.types"
import api from "./apiClient"
import type { ApplicationStatus } from "@/features/recruiter/types/applicationStatus.types"
import type { ApplicationFilters } from "@/features/candidate/types/applicationFilter.types"


//---------------------Candidate----------------------------------------------
export const applyToJobApi=async(data:ApplyJobDTO)=>{
    const res=await api.post("/application/apply",data)
    return res.data
}

export const candidateApplications=async({filters}:{filters:ApplicationFilters})=>{
    console.log(filters)
    const res=await api.get("/application/my",{params:filters})
    return res.data
}


//------------------------------Recruiter-----------------------------------

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