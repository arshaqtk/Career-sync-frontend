export interface ExperienceItem {
  id?: string;
  company: string;
  role: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string or undefined -> Present
  location?: string;
  logoUrl?: string;
  description?: string;
  responsibilities?: string[];
  skills?: string[];
  resumeUrl?: string;
}

export interface CandidateData {
  resumeUrl?: string;
  experience?: ExperienceItem[];
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