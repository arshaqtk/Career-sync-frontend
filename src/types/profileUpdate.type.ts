import type { Experience } from "@/features/candidate/types/Experience.types";
import { z } from "zod";

export const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 chars"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
});

export type ProfileUpdatePayload = z.infer<typeof profileUpdateSchema>;

export interface CandidateData {
  resume?: {
    key: string;
    originalName: string;
    uploadedAt: string;
  };
  experience?: Experience[];
  companyName?: string;
  skills?: string[];
  education?: string[];
  portfolioUrl?: string;
  about?: string;
}

export interface RecruiterData {
  company?: {
    _id: string;
    name: string;
    logo?: { url: string };
    website?: string;
    location?: string;
    description?: string;
    industry?: string;
    size?: string;
    foundedYear?: number;
    verificationStatus?: string;
    isActive?: boolean;
    owner: string;
  };
  companyApprovalStatus?: "pending" | "approved" | "rejected";
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "candidate" | "recruiter" | "admin";
  field?: string;
  location?: string;
  isVerified?: boolean;
  isActive?: boolean;
  profilePicture?: {
    url: string;
  };
  candidateData?: CandidateData;
  recruiterData?: RecruiterData;
  notificationCount?: number;
}


export type ProfileUpdateAvatar = FormData | {
  profilePictureUrl: string;
}
export type UpdateAboutPayload = {
  about: string | null;
};



