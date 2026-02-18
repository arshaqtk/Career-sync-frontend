import type { InterviewRoundType, InterviewStatus } from "./interview.type";

export type ScheduleInterviewPayload = {
  interviewId?: string;      // undefined for first round
  applicationId?: string;
  startTime: string;   // ISO
  endTime: string;     // ISO
  roundNumber:number;

  roundType: InterviewRoundType;
  mode: "Online" | "Offline";
  meetingLink?: string;
  location?: string;
  interviewerEmail?:string;
    statusHistory?: {
      status: InterviewStatus;
      changedAt: string;
    }[];
  scheduleMode?: "initial" | "reschedule" | "next_round";
};


export type ResecheduleInterviewPayload = {
  _id?: string;

  candidate?: {
    _id: string;
    name: string;
    email: string;
  };

  job?: {
    _id: string;
    title: string;
  };

  roundType: InterviewRoundType;
  mode: "Online" | "Offline";

  startTime?: string;
  endTime?: string;
  meetingLink?: string;
roundNumber:number;
  status?: InterviewStatus;
  statusHistory?: {
    status: InterviewStatus;
    changedAt: string;
  }[];

  notes?: string;
};