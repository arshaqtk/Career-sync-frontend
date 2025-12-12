import { z} from "zod";

export const applyJobSchema=z.object({
    jobId:z.string(),
resumeUrl: z.string({error: "Resume is required" }).min(1, "Resume must not be empty"),
    coverLetter:z.string().max(2000).optional(),
    expectedSalary: z.number().optional(),
  noticePeriod:z.string().optional()
})