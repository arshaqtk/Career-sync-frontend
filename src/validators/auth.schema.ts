import {z} from "zod";

export const registerSchema= z.object({
    name:z.string().min(5,"Name must be at least 5 characters"),
     email: z.string().email("Invalid email"),
     password: z.string().min(6, "Password must be at least 6 characters"),
     confirmpassword:z.string().min(6, "Password must be at least 6 characters"),
     role: z.enum(["recruiter", "candidate"])
})
export const loginSchema= z.object({
     email: z.string().email("Invalid email"),
     password: z.string().min(6, "Password must be at least 6 characters"),
     role: z.enum(["admin","recruiter", "candidate"])
})



export type RegisterFormValues=z.infer<typeof registerSchema>
export type LoginFormValues=z.infer<typeof loginSchema>