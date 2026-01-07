import type { Job } from "@/features/recruiter/types/job.type";

export type RecruiterJobsResponse = {
  jobs: Job[];
  pagination: {
    totalPages: number;
    page: number;
    limit: number;
  };
};