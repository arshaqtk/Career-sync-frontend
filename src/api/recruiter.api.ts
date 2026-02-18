import type { IUser, ProfileUpdatePayload } from "@/types/profileUpdate.type"
import api from "./apiClient"
import type { ApplicationFilters } from "@/features/recruiter/types/applicationFilters"
import type { CreateCompanySchema } from "@/features/recruiter/schemas/createCompany.schema"
import type { ApiResponse, ICompany } from "@/features/recruiter/types/company.types"
import type { UpdateRecruiterCompanyPayload } from "@/features/recruiter/types/Recruiter.type"
// export interface UpdateCompanyPayload {
//   companyName: string
//   companyWebsite?: string
//   companyLocation?: string
//   companyDescription?: string
// }
export const recruiterGetCandidateProfileApi=async(candidateId:string)=>{
    const res=await api.get(`/recruiter/candidates/${candidateId}`)
    return res.data
}

export const recruiterGetAllApplicationsApi=async({page=1, limit=5,filters}: {
      page: number;
      limit: number; 
    filters:ApplicationFilters})=>{
    const res=await api.get(`/application/recruiter?page=${page}&limit=${limit}`,{params:filters})
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
export const updateRecruiterCompanyApi = async (payload: UpdateRecruiterCompanyPayload): Promise<ICompany> => {
    const res = await api.patch(`/companies/${payload.companyId}`, payload.updates)
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


// Company Management APIs
export const createCompanyApi = async (payload:CreateCompanySchema):Promise<ApiResponse<ICompany>> => {
    const res = await api.post("/companies", payload);
    return res.data;
};

export const searchCompaniesApi = async (query: string):Promise<ApiResponse<ICompany[]>> => {
    const res = await api.get(`/companies/search?query=${query}`);
    return res.data;
};

export const joinCompanyApi = async (companyId: string):Promise<ApiResponse<ICompany>> => {
    const res = await api.post("/companies/join", { companyId });
    return res.data;
};

export const getCompanyByIdApi = async (companyId: string): Promise<ApiResponse<ICompany>> => {
    const res = await api.get(`/companies/${companyId}`);
    return res.data;
};