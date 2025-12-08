import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  description: z.string().optional(),
  skills: z.string().optional(),

  experienceMin: z
    .number()
    .refine(val => !isNaN(val), "Minimum experience is required"),

  experienceMax: z
    .number()
    .refine(val => !isNaN(val), "Maximum experience is required"),

  salary: z.string().min(1, "Salary is required"),
  location: z.string().min(1, "Location is required"),

  remote: z.boolean(),

  jobType: z.enum(["full-time", "part-time", "internship"]),
  status: z.enum(["open", "closed", "paused"]),

  applicationCount: z.number().optional(),
});
