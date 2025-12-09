import z from "zod";

export const experienceSchema = z.object({
  _id:z.string().optional(),
  company: z.string().min(2, "Company is required"),
  role: z.string().min(2, "Role is required"),


  startDate: z.string("Start date is required"),

  endDate: z.date().optional().nullable().transform(val => val ?? undefined),

  location: z.string().optional(),
  logoUrl: z.string().optional().nullable(),
  description: z.string().optional(),

  // responsibilities: z.array(
  //   z.object({ value: z.string().min(1) })
  // ).optional(),

skills: z.preprocess(
    (val) => {
      if (!val) return [];
      if (typeof val === "string") {
        return val.split(",").map((s) => s.trim());
      }
      return val;
    },
    z.array(z.string())
  ),

  jobType: z.enum(["full-time", "part-time", "internship"]),
});

export type ExperienceFormSchema = z.infer<typeof experienceSchema>;
