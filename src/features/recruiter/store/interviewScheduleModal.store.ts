// store/interviewScheduleModal.store.ts
import { create } from "zustand";
import type { ScheduleInterviewPayload } from "../types/scheduledInterview.types";

type InterviewScheduleModalState = {
  open: boolean;
  selectedInterview?: ScheduleInterviewPayload;
  openModal: (interview?: ScheduleInterviewPayload) => void;
  closeModal: () => void;
};

export const useInterviewScheduleModalStore =
  create<InterviewScheduleModalState>((set) => ({
    open: false,
    selectedInterview: undefined,

    openModal: (interview) =>
      set({ open: true, selectedInterview: interview }),

    closeModal: () =>
      set({ open: false, selectedInterview: undefined }),
  }));
