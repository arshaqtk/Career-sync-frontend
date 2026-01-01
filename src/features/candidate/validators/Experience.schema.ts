import { z } from "zod";

export const experienceSchema = z.object({
  _id: z.string().optional(),

  company: z.string().min(1),
  role: z.string().min(1),

  description: z.string().optional(),

  skills: z.string().optional(), // 👈 STRING IN FORM

  location: z.string().optional(),

  jobType: z.enum(["full-time", "part-time", "internship"]),

  startDate: z.date(),
  endDate: z.date().optional(),
});

