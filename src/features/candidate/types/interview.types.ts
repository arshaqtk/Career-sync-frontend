export type InterviewStatus =
  | "Scheduled"
  | "InProgress"
  | "Completed"
  | "Cancelled"
  | "Rescheduled"

export type InterviewMode = "Online" | "Offline"

export interface StatusHistoryItem {
  status: InterviewStatus;
  changedAt: string; // ISO date string
  notes?: string;
}

export interface InterviewTimelineItem {
  id: string;
  roundNumber: number;
  roundType: string;
  mode: InterviewMode;
  status: InterviewStatus;
  startTime?: string;
  endTime?: string;
  statusHistory?: StatusHistoryItem[];
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
  location?:string
  notes?: string
   statusHistory?: {
      status: InterviewStatus;
      changedAt: string;
    }[];
}
