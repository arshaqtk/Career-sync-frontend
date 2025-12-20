import type { InterviewRoundType } from "../interview/types/interview-details.types";

export type ScheduleInterviewPayload = {
  startTime: string;   // ISO
  endTime: string;     // ISO
  timezone: string;

  roundType: InterviewRoundType;
  durationMinutes?: number;
  mode: "Online" | "Offline";
  meetingLink?: string;
  location?: string;
};