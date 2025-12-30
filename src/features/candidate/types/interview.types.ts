export type InterviewStatus =
  | "Scheduled"
  | "InProgress"
  | "Completed"
  | "Cancelled"
  | "Rescheduled"

export type InterviewMode = "Video" | "Coding" | "InPerson"

export interface InterviewTimelineItem {
  _id:string
  roundNumber: number
  roundType: string
  status: InterviewStatus
  date: string
  startTime:string
}

export interface CandidateInterview {
  _id: string
  jobTitle: string
  companyName: string
  roundNumber: number
  roundType: string
  mode: InterviewMode
  status: InterviewStatus
  startTime: string
  endTime: string
  meetingLink?: string
  notes?: string
   statusHistory?: {
      status: InterviewStatus;
      changedAt: string;
    }[];
}
