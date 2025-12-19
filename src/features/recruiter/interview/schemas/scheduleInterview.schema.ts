import { z } from "zod";

export const scheduleInterviewSchema = z
  .object({
    date: z.date({
      error: "Date is required",
    }),

    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),

    timezone: z.string().min(1, "Timezone is required"),

    mode: z.enum(["Online", "Offline"]),

    meetingLink: z.string().optional(),
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
