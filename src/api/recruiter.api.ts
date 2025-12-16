import api from "./apiClient"

export const recruiterGetCandidateProfileApi=async(candidateId:string)=>{
    const res=await api.get(`/recruiter/candidates/${candidateId}`)
    return res.data
}

export const recruiterGetAllApplicationsApi=async()=>{
    const res=await api.get("/application/recruiter")
    return res.data
}