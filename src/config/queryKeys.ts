export const QUERY_KEYS = {
  user: {
    all: ["user"],
    profile: () => ["user", "profile"],
    byId: (id: string) => ["user", id],
  },

  jobs: {
    all: ["jobs"],
    list: (filters?: Record<string, any>) => ["jobs", filters],
    detail: (jobId: string) => ["jobs", jobId],
  },

  applications: {
    all: ["applications"],
    byCandidate: (candidateId: string) => ["applications", "candidate", candidateId],
    byJob: (jobId: string) => ["applications", "job", jobId],
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
