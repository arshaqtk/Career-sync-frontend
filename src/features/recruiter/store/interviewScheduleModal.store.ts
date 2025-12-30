import { create } from "zustand";
import type { InterviewDetails } from "../types/interview-details.types";

type InterviewScheduleMode = "schedule" | "reschedule";

type InterviewScheduleModalState = {
  open: boolean;
  mode: InterviewScheduleMode;
  selectedInterview?: InterviewDetails;

  openModal: (params: {
    mode: InterviewScheduleMode;
    interview?: InterviewDetails;
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