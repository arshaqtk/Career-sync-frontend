import type { InterviewListFilters } from "@/features/recruiter/interview/types/interview.type"
import api from "./apiClient"


export const recruiterGetInterviews=async({params}:{params:InterviewListFilters})=>{
    const res=await api.get("/interview/recruiter/interviews",{params})
    return res.data
}

export const recruiterGetInterviewDetailApi=async(id:string)=>{
    const res=await api.get(`interview/recruiter/interviews/${id}`)
    return res.data
}