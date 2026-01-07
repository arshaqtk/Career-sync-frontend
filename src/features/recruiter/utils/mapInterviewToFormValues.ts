// utils/mapInterviewToFormValues.ts
import { parseISO, format } from "date-fns";
import type { ScheduleInterviewPayload } from "../types/scheduledInterview.types";
import type { ScheduleInterviewFormValues } from "../schemas/scheduleInterview.schema";

export function mapInterviewToFormValues(
  interview?: ScheduleInterviewPayload
): Partial<ScheduleInterviewFormValues> | undefined {
  if (!interview) return undefined;

  const start = parseISO(interview.startTime);
  const end = parseISO(interview.endTime);

  return {
    date: start,
    startTime: format(start, "HH:mm"),
    endTime: format(end, "HH:mm"),
    roundNumber: interview.roundNumber,
    mode: interview.mode,
    roundType: interview.roundType,
    meetingLink: interview.meetingLink,
    location: interview.location,
  };
}
