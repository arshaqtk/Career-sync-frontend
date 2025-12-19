export type ScheduleInterviewPayload = {
  startTime: string;   // ISO
  endTime: string;     // ISO
  timezone: string;
  mode: "Online" | "Offline";
  meetingLink?: string;
  location?: string;
};