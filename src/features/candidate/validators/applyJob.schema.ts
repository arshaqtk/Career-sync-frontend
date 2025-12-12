import { z} from "zod";

export const applyJobSchema=z.object({
    jobId:z.string(),
resumeUrl: z.string({error: "Resume is required" }).min(1, "Resume must not be empty"),
    coverLetter:z.string().max(2000).optional(),
    experience:z.string({error: "Experience is required" }),
    expectedSalary: z.number().optional(),
  noticePeriod:z.string().optional(),
  currentRole:z.string({error: "Current Role is required" })
})