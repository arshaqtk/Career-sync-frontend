
export interface CandidateApplicationDetailResponse {
  application: {
    id: string
    status: "Pending" | "Shortlisted" | "Selected" | "Rejected"


    experience: string
    currentRole: string
    resumeUrl: string
    coverLetter?: string
    expectedSalary?: number
    noticePeriod?: string

   
    decisionNote?: string

    appliedAt: string   // ISO string
    updatedAt: string  // ISO string
  }

  job: {
    id: string
    title: string
    company: string
    description?: string

    skills?: string[]
    experienceMin?: number
    experienceMax?: number

    salary?: string
    field: string
    location?: string
    remote?: boolean
    jobType: "full-time" | "part-time" | "internship"
  }

  recruiter: {
    name: string
    email: string

    company: {
      companyName?: string
      companyWebsite?: string
      companyLogo?: string
      companyLocation?: string
      companyDescription?: string
    }
  }
}

export interface CompanyData{
     companyName?: string;
  companyWebsite?: string;
  companyLogo?: string;
  companyLocation?: string;
  companyDescription?: string;
}

export interface JobDetails {
  _id?:string
  title: string;
  company: string;
  field:string;
  description?: string;
  skills: string[];
  experienceMin: number;
  experienceMax: number;
  salary?: string
  location: string;
  remote: boolean;
  jobType: "full-time" | "part-time" | "internship";
  status: "open" | "closed" | "paused";
  applicationCount?: number;
  hasApplied:boolean;
  createdAt?: Date;
}

export interface ApplicationDetails{
    status:"Pending" | "Shortlisted" | "Selected" | "Rejected";
     coverLetter?: string;
  expectedSalary?: number; 
  noticePeriod?: string;
  experience:string;
  currentRole:string;
  resumeUrl:string;
  decisionNote:string;
}

export const STATUS_FLOW = ["Pending", "Shortlisted", "Interview","Selected", "Rejected"] as const