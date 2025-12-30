import type { IUser, ProfileUpdatePayload } from "@/types/profileUpdate.type"
import api from "./apiClient"
export interface UpdateCompanyPayload {
  companyName: string
  companyWebsite?: string
  companyLocation?: string
  companyDescription?: string
}
export const recruiterGetCandidateProfileApi=async(candidateId:string)=>{
    const res=await api.get(`/recruiter/candidates/${candidateId}`)
    return res.data
}

export const recruiterGetAllApplicationsApi=async()=>{
    const res=await api.get("/application/recruiter")
    return res.data
}

export const fetchRecruiterProfile=async()=>{
   const res=await api.get("/user/profile")
   return res.data
}

export const updateRecruiterProfileApi=async(payload:ProfileUpdatePayload):Promise<IUser>=>{
    const res=await api.put("/user/update-profile-basic",payload)
    return res.data.data
}
export const updateRecruiterCompanyApi=async( payload: UpdateCompanyPayload):Promise<IUser>=>{
    const res=await api.put("/user/company",payload)
    return res.data.data
}
export const updateRecruiterAvatarApi=async(payload:FormData):Promise<IUser>=>{
    const res=await api.put("/user/update-profile-avatar",payload)
    return res.data.data
} 

export const fetchRecruiterProfileStatsApi=async()=>{
   const res=await api.get("/recruiter/profile/stats")
   return res.data
}