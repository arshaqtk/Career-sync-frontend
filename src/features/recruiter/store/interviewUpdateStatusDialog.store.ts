import { create } from "zustand";

type InterviewStatusAction = "Completed" | "Cancelled";

interface InterviewStatusModalStore {
  isOpen: boolean;
  status: InterviewStatusAction | null;

  openModal: (status: InterviewStatusAction) => void;
  closeModal: () => void;
}

export const useUpdateInterviewStatusStore =
  create<InterviewStatusModalStore>((set) => ({
    isOpen: false,
    status: null,

    openModal: (status) =>
      set({
        isOpen: true,
        status,
      }),

    closeModal: () =>
      set({
        isOpen: false,
        status: null,
      }),
  }));
