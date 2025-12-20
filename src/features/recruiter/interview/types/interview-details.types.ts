export type InterviewStatus =
  | "Pending"
  | "Scheduled"
  |"Rescheduled"
  | "Completed"
  | "Cancelled";

  export type InterviewRoundType =
  | "HR"
  | "Technical"
  | "Managerial"
  | "Final";

export type InterviewDetails = {
  _id: string;

  candidate: {
    _id: string;
    name: string;
    email: string;
  };

  job: {
    _id: string;
    title: string;
  };

  roundType: InterviewRoundType;
  mode: "Online" | "Offline";

  startTime?: string;
  endTime?: string;
  meetingLink?: string;

  status: InterviewStatus;

  statusHistory: {
    status: InterviewStatus;
    changedAt: string;
  }[];

  notes?: string;
};
