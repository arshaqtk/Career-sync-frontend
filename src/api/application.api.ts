import type { ApplyJobDTO } from "@/features/candidate/types/application.types"
import api from "./apiClient"
import type { ApplicationStatus, SelectedOrRejected } from "@/features/recruiter/types/applicationStatus.types"
import type { ApplicationFilters } from "@/features/candidate/types/applicationFilter.types"
import type { CandidateApplicationDetailResponse } from "@/features/candidate/types/applicationDetail.types"


//---------------------Candidate----------------------------------------------
export const applyToJobApi=async(data:ApplyJobDTO)=>{
    const res=await api.post("/application/apply",data)
    return res.data
}

export const candidateApplications=async({filters}:{filters:ApplicationFilters})=>{
    const res=await api.get("/application/my",{params:filters})
    return res.data
}

export const candidateApplicationDetailViewApi=async({applicationId}:{applicationId:string}):Promise<CandidateApplicationDetailResponse>=>{
    const res=await api.get(`/application/my/${applicationId}`)
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

export const RecruiterFinalizeApplicationStatusApi=async({applicationId,status,note}:{applicationId?:string,status:SelectedOrRejected,note:string})=>{
  
    const res=await api.post(`/interview/recruiter/interviews/${applicationId}/finalize`,{decision:status,note});
    return res.data
}