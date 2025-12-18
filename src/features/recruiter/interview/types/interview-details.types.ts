export type InterviewStatus =
  | "Pending"
  | "Scheduled"
  |"Rescheduled"
  | "Completed"
  | "Cancelled";

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

  roundType: string;
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
