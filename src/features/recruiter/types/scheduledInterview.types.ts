import type { InterviewRoundType } from "./interview.type";

export type ScheduleInterviewPayload = {
  startTime: string;   // ISO
  endTime: string;     // ISO
  timezone: string;
  roundNumber:number;

  roundType: InterviewRoundType;
  durationMinutes?: number;
  mode: "Online" | "Offline";
  meetingLink?: string;
  location?: string;
};