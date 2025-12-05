import * as z from "zod";

export const jobSchema = z.object({
  title: z.string(),
  company: z.string(),
  description: z.string().optional(),
  skills: z.string().optional(),
  experienceMin: z.number().optional(),
  experienceMax: z.number().optional(),
  salary: z.string().optional(),
  location: z.string().optional(),
  remote: z.boolean().default(false),   // FIX
  jobType: z.enum(["full-time", "part-time", "internship"]),
  status: z.enum(["open", "closed", "paused"]),
  applicationCount: z.number().optional(),
});

