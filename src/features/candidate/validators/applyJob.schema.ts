import { z} from "zod";

export const applyJobSchema=z.object({
    jobId:z.string(),
resumeUrl: z.string({error: "Resume is required" }).min(1, "Resume must not be empty"),
    coverLetter:z.string().max(2000).optional(),
    experience:z.number({error: "Experience is required" }).min(0,"Expected salary should be positive"),
    expectedSalary: z.number("Expected salary Should be number").min(0,"Expected salary should be positive").optional(),
  noticePeriod:z.string().optional(),
  currentRole: z
  .string({ error: "Current Role is required" })
  .min(2, "Current Role is too short")
  .regex(/^[A-Za-z\s]+$/, "Current Role must contain only letters"),
})