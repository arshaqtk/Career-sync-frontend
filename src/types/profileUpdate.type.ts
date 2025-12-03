import { z } from "zod";

export const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 chars"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  profilePictureUrl: z.string().optional(),
});

export type ProfileUpdatePayload = z.infer<typeof profileUpdateSchema>;

export interface IUser {
  name: string;
  email: string;
  phone: string;
  profilePictureUrl?: string;
}
