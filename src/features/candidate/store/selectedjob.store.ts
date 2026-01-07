import { create } from "zustand";
import type { CandidateJob } from "../types/candidateJob.type";

interface JobStore {
  selectedJob: CandidateJob|null;
  setSelectedJob: (job: CandidateJob|null) => void;
}

export const useJobStore = create<JobStore>((set) => ({
  selectedJob: null,
  setSelectedJob: (job) => set({ selectedJob: job }),
}));
