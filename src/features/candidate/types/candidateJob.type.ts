export interface CandidateJob {
  _id?: string
  title: string;
  company: string | { _id: string; name: string };
  field: string;
  description?: string;
  skills: string[];
  experienceMin: number;
  experienceMax: number;
  salary?: number
  location: string;
  remote: boolean;
  jobType: "full-time" | "part-time" | "internship";
  status: "open" | "closed" | "paused";
  applicationCount?: number;
  hasApplied: boolean;
  companyId?: string | null;
  companyLogo?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}