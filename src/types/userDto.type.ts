// export interface ExperienceItem {
//   id?: string;
//   company: string;
//   role: string;
//   startDate: Date; // ISO date string
//   endDate?: Date; // ISO date string or undefined -> Present
//   location?: string;
//   logoUrl?: string;
//   description?: string;
//   responsibilities?: string[];
//   skills?: string[];
//   resumeUrl?: string;
// }

import type { Education } from "@/features/candidate/types/Education.types";
import type { Experience } from "@/features/candidate/types/Experience.types";

export interface CandidateData {
  resume?: {
    url: string,
    originalName: string,
    uploadedAt: string,
  };
  experience?: Experience[];
   companyName?: string;
  skills?: string[];
  education?: Education[];
  portfolioUrl?: string;
  about?:string;
}

export interface RecruiterData {
  company?: {
    _id: string;
    name: string;
    logo?: { url: string };
    website?: string;
    location?: string;
    industry?: string;
  }
}

export interface UserDto {
  name: string;
  email: string;
  phone: string;
  profilePictureUrl:string
   role: "candidate" | "recruiter"
  isVerified: boolean;
  isActive: boolean;
  candidateData?: CandidateData;
  recruiterData?: RecruiterData;

}