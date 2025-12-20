export type InterviewStatus =
  | "Pending"
  | "Scheduled"
  | "Rescheduled"
  | "Completed"
  | "Cancelled";
  
  export type InterviewRoundType =
  | "HR"
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
