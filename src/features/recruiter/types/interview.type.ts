export type InterviewStatus =
 | "Scheduled"
  | "Rescheduled"
  | "InProgress"
  | "Completed"
  | "Selected"
  | "Rejected"
  | "Cancelled"
  | "NoShow";
  
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
