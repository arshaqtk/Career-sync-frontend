import z from "zod";

export const experienceSchema = z.object({
  company: z.string().min(2, "Company is required"),
  role: z.string().min(2, "Role is required"),


  startDate: z.date("Start date is required"),

  endDate: z.date().optional().nullable(),

  location: z.string().optional(),
  logoUrl: z.string().optional().nullable(),
  description: z.string().optional(),

  responsibilities: z.array(
    z.object({ value: z.string().min(1) })
  ).optional(),

  skills: z
    .string()
    .optional()
    .transform((val) =>
      val ? val.split(",").map((s) => s.trim()) : []
    ),

  jobType: z.enum(["full-time", "part-time", "internship"]),
});

export type ExperienceFormSchema = z.infer<typeof experienceSchema>;
