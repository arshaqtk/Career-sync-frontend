import  z from "zod";

const responsibilitySchema = z.object({ value: z.string().min(1) });
const skillSchema = z.object({ value: z.string().min(1) });

export const experienceSchema = z.object({
  company: z.string().min(2, "Company is required"),
  role: z.string().min(2, "Role is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional().nullable(),
  location: z.string().optional(),
  logoUrl: z.string().optional().nullable(),
  description: z.string().optional(),
  responsibilities: z.array(responsibilitySchema).optional(),
  skills: z.array(skillSchema).optional(),
  resumeUrl: z.string().optional().nullable(),
});

export type ExperienceFormSchema = z.infer<typeof experienceSchema>;