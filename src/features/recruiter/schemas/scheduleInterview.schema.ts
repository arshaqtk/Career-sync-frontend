import { z } from "zod";

const timeStringSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must be in HH:MM format (24-hour)");

const baseSchema = z.object({
  date: z.date({error: "Date is required" }),
  startTime: timeStringSchema.min(1, "Start time is required"),
  endTime: timeStringSchema.min(1, "End time is required"),
  roundNumber: z.number().int().positive("Round number must be positive"),
  roundType: z.enum(["Hr", "Technical", "Managerial", "Final"]),
});

const onlineSchema = baseSchema.extend({
  mode: z.literal("Online"),
  meetingLink: z.string().url("Invalid URL").min(1, "Meeting link is required"),
  location: z.string().optional(), // explicitly optional
});

const offlineSchema = baseSchema.extend({
  mode: z.literal("Offline"),
  location: z.string().min(1, "Location is required"),
  meetingLink: z.string().optional(),
});

export const scheduleInterviewSchema = z.discriminatedUnion("mode", [
  onlineSchema,
  offlineSchema,
]);

// Time comparison
export const scheduleInterviewSchemaWithTimeCheck = scheduleInterviewSchema.refine(
  (data) => {
    const [sh, sm] = data.startTime.split(":").map(Number);
    const [eh, em] = data.endTime.split(":").map(Number);
    return eh * 60 + em > sh * 60 + sm;
  },
  {
    message: "End time must be after start time",
    path: ["endTime"],
  }
);

export type ScheduleInterviewFormValues = z.infer<typeof scheduleInterviewSchemaWithTimeCheck>;