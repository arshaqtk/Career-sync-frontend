import type { Job } from "@/types/job.type";

export interface ApplyJobDTO {
  jobId: string;
  resumeUrl: string;
  coverLetter?: string;
  expectedSalary?: number; 
  noticePeriod?: string;
}

export interface Application {
  candidateId: string;
  jobId: Job;
  resumeUrl: string;
  status: "Pending" | "Shortlisted" | "Selected" | "Rejected";
  coverLetter?: string; 
  expectedSalary?: number;
  noticePeriod?: string;
  createdAt:string
}