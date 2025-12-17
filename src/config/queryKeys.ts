import type { ApplicationFilters } from "@/features/candidate/types/applicationFilter.types";
import type { JobFilters } from "@/features/candidate/types/jobFilter.types";

export const QUERY_KEYS = {
  user: {
    all: ["user"],
    profile: () => ["user", "profile"],
    byId: (id: string) => ["user", id],
  },

  jobs: {
    all: ["jobs"],
    lists: () => [...QUERY_KEYS.jobs.all, "list"] as const,

    list: (params: {
      page: number;
      limit: number;
      filters?: JobFilters
      sort?: string;
    }) =>
      [
        ...QUERY_KEYS.jobs.lists(),
        params,
      ] as const,

    detail: (jobId: string) => ["jobs", jobId],
  },

  applications: {
    all: ["applications"],
    byCandidate: (
      candidateId: string,
      filters?: ApplicationFilters
    ) => ["applications", "candidate", candidateId, filters],
    byJob: (
      jobId: string,
      filters?: ApplicationFilters
    ) => ["applications", "job", jobId, filters],
    detail: (applicationId: string) => ["applications", "detail", applicationId],
  },

  recruiter: {
    candidateProfile: (candidateId: string) => [
      "recruiter",
      "candidate",
      candidateId,
    ],
    jobApplicants: (jobId: string) => [
      "recruiter",
      "job",
      jobId,
      "applicants",
    ],
  },
};
