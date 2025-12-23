import { create } from "zustand";
import type { ScheduleInterviewPayload } from "../types/scheduledInterview.types";

interface InterviewScheduleModalStore {
  isOpen: boolean;
  interview: ScheduleInterviewPayload | null;

  openModal: (selectedInterview?: ScheduleInterviewPayload) => void;
  closeModal: () => void;
}


export const useInterviewScheduleModalStore = create<InterviewScheduleModalStore>((set) => ({
  isOpen: false,
  interview: null,
  openModal: (selectedInterview) => set({ isOpen: true, interview: selectedInterview ?? null }),
  closeModal: () => set({ isOpen: false, interview: null }),
}));