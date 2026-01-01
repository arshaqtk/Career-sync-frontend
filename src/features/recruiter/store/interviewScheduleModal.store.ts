import { create } from "zustand";
import type { ResecheduleInterviewPayload } from "../types/scheduledInterview.types";

type InterviewScheduleMode = "schedule" | "reschedule";

type InterviewScheduleModalState = {
  open: boolean;
  mode: InterviewScheduleMode;
  selectedInterview?: ResecheduleInterviewPayload;

  openModal: (params: {
    mode: InterviewScheduleMode;
    interview?: ResecheduleInterviewPayload;
  }) => void;

  closeModal: () => void;
};

export const useInterviewScheduleModalStore =
  create<InterviewScheduleModalState>((set) => ({
    open: false,
    mode: "schedule",
    selectedInterview: undefined,

    openModal: ({ mode, interview }) =>
      set({
        open: true,
        mode,
        selectedInterview: interview,
      }),

    closeModal: () =>
      set({
        open: false,
        mode: "schedule",
        selectedInterview: undefined,
      }),
  }));