import type { Job } from "@/features/recruiter/types/job.type";
import { create } from "zustand";

interface JobModalStore {
  isOpen: boolean;
  selectedJob: Job | null;

  openModal: (job?: Job) => void;
  closeModal: () => void;
}

export const useJobModalStore = create<JobModalStore>((set) => ({
  isOpen: false,
  selectedJob: null,

  openModal: (job) => set({ isOpen: true, selectedJob: job || null }),
  closeModal: () => set({ isOpen: false, selectedJob: null }),
}));
