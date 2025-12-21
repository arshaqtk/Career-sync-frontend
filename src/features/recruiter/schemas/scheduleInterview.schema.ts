import { z } from "zod";

export const scheduleInterviewSchema = z.object({
  date: z.date(),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),

  timezone: z.string(),
  mode: z.enum(["Online", "Offline"]),
  roundNumber:z.number().int().positive(),
  roundType: z.enum([
    "Hr",
    "Technical",
    "Managerial",
    "Final",
  ]),

  durationMinutes: z
    .number()
    .int()
    .positive()
    .optional(),

  meetingLink: z.string().url().optional(),
  location: z.string().optional(),
})


  .refine(
    (data) => data.endTime > data.startTime,
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  )
 
  .superRefine((data, ctx) => {
    if (data.mode === "Online" && !data.meetingLink) {
      ctx.addIssue({
        path: ["meetingLink"],
        message: "Meeting link is required for online interview",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.mode === "Offline" && !data.location) {
      ctx.addIssue({
        path: ["location"],
        message: "Location is required for offline interview",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type ScheduleInterviewFormValues = z.infer<
  typeof scheduleInterviewSchema
>;
