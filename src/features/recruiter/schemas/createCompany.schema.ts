import { z } from "zod";

export const createCompanySchema = z.object({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    location: z.string().min(2, "Location is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    industry: z.string().min(2, "Industry is required"),
    size: z.string().min(1, "Please select company size"),
    foundedYear: z.number().min(1800, "Invalid year").max(new Date().getFullYear(), "Year cannot be in the future").optional(),
});

export type CreateCompanySchema = z.infer<typeof createCompanySchema>;
