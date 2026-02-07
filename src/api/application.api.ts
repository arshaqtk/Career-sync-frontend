import type { ApplyJobDTO } from "@/features/candidate/types/application.types"
import api from "./apiClient"
import type { ApplicationStatus, SelectedOrRejected } from "@/features/recruiter/types/applicationStatus.types"
import type { ApplicationFilters } from "@/features/candidate/types/applicationFilter.types"
import type { CandidateApplicationDetailResponse } from "@/features/candidate/types/applicationDetail.types"


//-------------------Resume Preview-----------------------------------------
export const getResumeUrlApi=async({applicationId,key}:{applicationId:string,key:string})=>{
    console.log(key)
    const res=await api.post(`/application/${applicationId}/resume?mode=view`,{data:key})
    return res.data.resumeUrl
}

export const getResumeDownloadUrlApi=async()=>{
    const res=await api.get("/candidate/profile/resume?mode=download")
    return res.data
}


//---------------------Candidate----------------------------------------------
export const applyToJobApi=async(data:ApplyJobDTO)=>{
    const res=await api.post("/application/apply",data)
    return res.data
}

export const candidateApplications = async ({
  filters,
  page,
  limit,
}: {   filters: ApplicationFilters;  page: number;  limit: number;}) =>
     {const res = await api.get("/application/my", {   params: { ...filters, page, limit,},
  });

  return res.data;
};

export const candidateApplicationDetailViewApi=async({applicationId}:{applicationId:string}):Promise<CandidateApplicationDetailResponse>=>{
    const res=await api.get(`/application/my/${applicationId}`)
    return res.data
}


//------------------------------Recruiter-----------------------------------

export const recruiterJobApplicationsApi=async(jobId:string)=>{
    const res=await api.get(`/application/job/${jobId}`)
    return res.data
}

export const recruiterGetApplicationDetailsApi=async(applicantionId:string)=>{
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