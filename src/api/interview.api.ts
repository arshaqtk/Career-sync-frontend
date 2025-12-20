import type { InterviewListFilters } from "@/features/recruiter/interview/types/interview.type"
import api from "./apiClient"
import type { ScheduleInterviewPayload } from "@/features/recruiter/types/scheduledInterview.types"
import type { InterviewStatus } from "@/features/recruiter/interview/types/interview.type"


export const recruiterGetInterviews=async({params}:{params:InterviewListFilters})=>{
    const res=await api.get("/interview/recruiter/interviews",{params})
    return res.data
}

export const recruiterGetInterviewDetailApi=async(id:string)=>{
    const res=await api.get(`interview/recruiter/interviews/${id}`)
    return res.data
}

export const recruiterScheduleInterviewApi=async({applicationId,payload}:{applicationId:string,payload:ScheduleInterviewPayload})=>{
const res=await api.patch(`interview/recruiter/interviews/${applicationId}/schedule`,payload)
    return res.data
}

export const recruiterUpdateInterviewStatusApi=async({interviewId,payload}:{interviewId:string,payload:{
    status:InterviewStatus,
    notes?:string
}})=>{
const res=await api.patch(`interview/recruiter/interviews/${interviewId}/status`,payload)
    return res.data
}