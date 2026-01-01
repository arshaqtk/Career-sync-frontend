import type { ApplicationFilters } from "@/features/candidate/types/applicationFilter.types";
import type { JobFilters } from "@/features/candidate/types/jobFilter.types";

export const QUERY_KEYS = {
  user: {
    all: ["user"] as const,
    profile: () => [...QUERY_KEYS.user.all, "profile"] as const,
    byId: (id: string) => [...QUERY_KEYS.user.all, id] as const,
     ProfileStats: ["recruiter", "profile","stats"] as const,
  },

  jobs: {
    all: ["jobs"] as const,

    lists: () => [...QUERY_KEYS.jobs.all, "list"] as const,

    list: (params: {
      page: number;
      limit: number;
      filters?: JobFilters;
      sort?: string;
    }) =>
      [...QUERY_KEYS.jobs.lists(), params] as const,

    detail: (jobId: string) =>
      [...QUERY_KEYS.jobs.all, jobId] as const,
  },

  applications: {
    all: ["applications"] as const,

    byCandidate: (
      candidateId: string,page:number,limit:number,
      filters?: ApplicationFilters,
    ) =>
      [
        ...QUERY_KEYS.applications.all,
        "candidate",
        candidateId,
        filters,page,limit
      ] as const,

    byJob: (
      jobId: string,
      filters?: ApplicationFilters
    ) =>
      [
        ...QUERY_KEYS.applications.all,
        "job",
        jobId,
        filters,
      ] as const,

    detail: (applicationId: string) =>
      [...QUERY_KEYS.applications.all, "detail", applicationId] as const,
  },

  interviews: {
    all: ["interviews"] as const,

    lists: () => [...QUERY_KEYS.interviews.all, "list"] as const,

    listByRecruiter: (recruiterId: string) =>
      [...QUERY_KEYS.interviews.lists(), { recruiterId }] as const,

    listByApplication: (applicationId: string) =>
      [...QUERY_KEYS.interviews.lists(), { applicationId }] as const,

    detail: (interviewId: string) =>
      [...QUERY_KEYS.interviews.all, "detail", interviewId] as const,
    
    
  },

  recruiter: {
    candidateProfile: (candidateId: string) =>
      ["recruiter", "candidate", candidateId] as const,

    jobApplicants: (jobId: string) =>
      ["recruiter", "job", jobId, "applicants"] as const,
    
     profile: () => [...QUERY_KEYS.user.all, "profile"] as const,
     ProfileStats: ["recruiter", "profile","stats"] as const,
  },

  admin:{
  dashboard: ["admin", "dashboard"] as const,
}
  }

