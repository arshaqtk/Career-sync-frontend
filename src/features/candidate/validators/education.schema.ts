import { z } from "zod";

export const educationSchema = z.object({
  _id: z.string().optional(),

  school: z
    .string()
    .min(2, "School/College name is required"),

  standard: z.enum(
    [
      "High School",
      "Higher Secondary",
      "Diploma",
      "Undergraduate",
      "Postgraduate",
      "Doctorate",
      "Other",
    ],"Please select education level",  
),

  startDate: z
    .date("Start date is required"),

 endDate: z.date().optional(),

  location: z.string().optional(),

  description: z.string().optional(),

  gradeOrPercentage: z.string().optional(),
})

 .superRefine((data, ctx) => {
    if (data.endDate && data.startDate && data.endDate < data.startDate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["endDate"],
        message: "End date cannot be earlier than start date",
      });
    }
  });