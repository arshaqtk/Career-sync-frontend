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

export type ExperienceFormValues=ExperienceItem