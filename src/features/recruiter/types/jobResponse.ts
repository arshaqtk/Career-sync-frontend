import type { Job } from "@/types/job.type";

export type RecruiterJobsResponse = {
  jobs: Job[];
  pagination: {
    totalPages: number;
    page: number;
    limit: number;
  };
};