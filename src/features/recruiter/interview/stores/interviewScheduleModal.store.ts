import { create } from "zustand";
import type { ScheduleInterviewPayload } from "../types/scheduledInterview.types";

interface InterviewScheduleModalStore {
  isOpen: boolean;
  selectedInterview: ScheduleInterviewPayload | null;

  openModal: (selectedInterview?: ScheduleInterviewPayload) => void;
  closeModal: () => void;
}

export const useInterviewScheduleModalStore = create<InterviewScheduleModalStore>((set) => ({
  isOpen: false,
  selectedInterview: null,

  openModal: (selectedInterview) => set({ isOpen: true, selectedInterview: selectedInterview ?? null }),
  closeModal: () => set({ isOpen: false, selectedInterview: null }),
}));