import type { Job } from "@/types/job.type";
import { create } from "zustand";

interface JobStore {
  selectedJob: Job|null;
  setSelectedJob: (job: Job) => void;
}

export const useJobStore = create<JobStore>((set) => ({
  selectedJob: null,
  setSelectedJob: (job) => set({ selectedJob: job }),
}));
