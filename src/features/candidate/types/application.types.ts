
export interface ApplyJobDTO {
  jobId: string;
  resumeKey: string;
  coverLetter?: string;
  expectedSalary?: number; 
  noticePeriod?: string;
  experience:number
  currentRole:string
}

export interface CandidateApplicationDTO {
  id: string;
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
  };
  status: "Pending" | "Shortlisted" | "Selected" | "Rejected";
  createdAt: string;
}