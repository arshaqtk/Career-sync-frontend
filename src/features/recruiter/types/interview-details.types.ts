import type { InterviewRoundType } from "./interview.type";

export type InterviewStatus =
  | "Scheduled"
  | "Rescheduled"
  | "InProgress"
  | "Completed"
  | "Selected"
  | "Rejected"
  | "Cancelled"
  | "NoShow";


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
roundNumber:number;
  status: InterviewStatus;

  statusHistory: {
    status: InterviewStatus;
    changedAt: string;
  }[];

  notes?: string;
};
