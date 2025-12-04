import { z } from "zod";

export const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 chars"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
 
});

export type ProfileUpdatePayload = z.infer<typeof profileUpdateSchema>;

export interface CandidateData {
  resumeUrl?: string;
  experienceYears?: number;
   companyName?: string;
  skills?: string[];
  education?: string[];
  portfolioUrl?: string;
  about?:string;
}

export interface RecruiterData {
  companyName?: string;
  companyWebsite?: string;
  companyLogo?: string;
  companyLocation?: string;
  companyDescription?: string;
}

export interface IUser {
  name: string;
  email: string;
  phone: string;
  profilePictureUrl:string
  candidateData?: CandidateData;
    recruiterData?: RecruiterData;
}


export type ProfileUpdateAvatar= FormData | {
  profilePictureUrl: string;
}
export type UpdateAboutPayload = {
  about: string|null;
};



