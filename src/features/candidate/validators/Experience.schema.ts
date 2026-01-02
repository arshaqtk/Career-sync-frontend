import { z } from "zod";

export const experienceFormSchema = z
  .object({
    _id: z.string().optional(),

    company: z.string().min(1, "Company is required"),
    role: z.string().min(1, "Role is required"),

    description: z.string().optional(),
    skills: z.string().optional(),
    location: z.string().optional(),

    jobType: z.enum(["full-time", "part-time", "internship"]),

    startDate: z.date({
      message: "Start date is required",
    }),

    endDate: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.endDate && data.endDate < data.startDate) {
      ctx.addIssue({
        path: ["endDate"],
        message: "End date cannot be before start date",
        code: z.ZodIssueCode.custom,
      });
    }
  });
