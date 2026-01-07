import { z } from "zod"

export const jobSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    company: z.string().min(1, "Company is required"),
    description: z.string().optional(),
    skills: z.string().optional(),

    experienceMin: z
      .number({
        error: (issue) => {
          if (issue.code === "invalid_type") {
            if (issue.received === "undefined") {
              return "Minimum experience is required";
            }
            return "Minimum experience must be a number";
          }
          
          return issue.message ?? "Invalid minimum experience";
        },
      })
      .min(0, "Minimum experience cannot be negative"),

    experienceMax: z
      .number({
        error: (issue) => {
          if (issue.code === "invalid_type") {
            if (issue.received === "undefined") {
              return "Maximum experience is required";
            }
            return "Maximum experience must be a number";
          }
          return issue.message ?? "Invalid maximum experience";
        },
      })
      .min(0, "Maximum experience cannot be negative"),

    field: z.string().min(1, "Field is required"),

    salary: z.number().min(0, "Salary is required and should not be negative"),
    location: z.string().min(1, "Location is required"),

    remote: z.boolean(),

    jobType: z.enum(["full-time", "part-time", "internship"]),
  })
  .refine(
    (data) => data.experienceMax >= data.experienceMin,
    {
      message: "Maximum experience must be greater than or equal to minimum experience",
      path: ["experienceMax"], // 👈 shows error on max field
    }
  )
