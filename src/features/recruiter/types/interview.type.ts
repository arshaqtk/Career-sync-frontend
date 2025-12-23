export type InterviewStatus =
 | "Scheduled"
  | "Rescheduled"
  | "InProgress"
  | "Completed"
  | "Selected"
  | "Rejected"
  | "Cancelled";
  
  export type InterviewRoundType =
  | "Hr"
  | "Technical"
  | "Managerial"
  | "Final";

export type InterviewListItem = {
  id: string;
  candidateName: string;
  jobTitle: string;
  roundType: string;
  startTime?: string;
  status: InterviewStatus;
};

export type InterviewListFilters = {
  status: InterviewStatus | "All";
  search: string;
  page?:number
};


export interface StatusHistory {
  roundNumber: number;
  status: InterviewStatus;
  changedAt: Date;
  note?: string;
}
export interface Interview {
  _id: string;
  roundNumber: number;
  roundType: InterviewRoundType;
  status: InterviewStatus;
  startTime: Date;
  endTime: Date;
  durationMinutes?: number;
  statusHistory?: StatusHistory[];
  mode?: "Online" | "Offline";
  notes?: string;
  createdAt: Date;
}