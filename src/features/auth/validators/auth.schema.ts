import {z} from "zod";

export const registerSchema= z.object({
    name:z.string().min(5,"Name must be at least 5 characters"),
     email: z.string().email("Invalid email"),
     password: z.string().min(6, "Password must be at least 6 characters"),
     confirmPassword:z.string().min(6, "Password must be at least 6 characters"),
     role: z.enum(["recruiter", "candidate"]),
     field:z.string().min(1,"field required")
})
export const loginSchema= z.object({
     email: z.string().email("Invalid email"),
     password: z.string().min(6, "Password must be at least 6 characters"),
     role: z.enum(["admin","recruiter", "candidate"])
})



export const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8,"Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });




export type RegisterFormValues=z.infer<typeof registerSchema>
export type LoginFormValues=z.infer<typeof loginSchema>