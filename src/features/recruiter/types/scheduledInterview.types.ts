import type { InterviewRoundType, InterviewStatus } from "./interview.type";

export type ScheduleInterviewPayload = {
  interviewId?: string;      // undefined for first round
  applicationId?: string;
  startTime: string;   // ISO
  endTime: string;     // ISO
  timezone: string;
  roundNumber:number;

  roundType: InterviewRoundType;
  durationMinutes?: number;
  mode: "Online" | "Offline";
  meetingLink?: string;
  location?: string;
    statusHistory?: {
      status: InterviewStatus;
      changedAt: string;
    }[];
  scheduleMode?: "initial" | "reschedule" | "next_round";
};