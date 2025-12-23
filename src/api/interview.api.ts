import type { InterviewListFilters } from "@/features/recruiter/types/interview.type"
import api from "./apiClient"
import type { ScheduleInterviewPayload } from "@/features/recruiter/types/scheduledInterview.types"
import type { InterviewStatus } from "@/features/recruiter/types/interview.type"


export const recruiterGetInterviews=async({params}:{params:InterviewListFilters})=>{
    const res=await api.get("/interview/recruiter/interviews",{params})
    return res.data
}

export const recruiterGetInterviewDetailApi=async(id:string)=>{
    const res=await api.get(`interview/recruiter/interviews/${id}`)
    return res.data
}

export const scheduleInitialInterview=async({payload}:{payload:ScheduleInterviewPayload})=>{
const res=await api.post(`interview/recruiter/interviews/${payload.applicationId}/schedule`,payload)
    return res.data
}

export const rescheduleInterview=async({payload}:{payload:ScheduleInterviewPayload})=>{
const res=await api.post(`interview/recruiter/interviews/${payload.interviewId}/reschedule`,payload)
    return res.data
}

export const createNextRound=async({payload}:{payload:ScheduleInterviewPayload})=>{
    const res=await api.post(`interview/recruiter/interviews/${payload.applicationId}/nextround`,payload)
    return res.data
}

export const recruiterUpdateInterviewStatusApi=async({interviewId,payload}:{interviewId:string,payload:{
    status:InterviewStatus,
    notes?:string,
    roundNumber:number
}})=>{
const res=await api.patch(`interview/recruiter/interviews/${interviewId}/status`,payload)
    return res.data
}

export const recruiterGetApplicationInterviewTimeLineApi=async({applicationId}:{applicationId:string})=>{
     const res=await api.get(`interview/recruiter/applications/${applicationId}/interviews`)
    return res.data
}