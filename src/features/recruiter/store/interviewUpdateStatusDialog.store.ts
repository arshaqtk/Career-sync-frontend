import { create } from "zustand";

type InterviewStatusAction = "Completed" | "Cancelled";

interface InterviewStatusModalStore {
  isOpen: boolean;
  status: InterviewStatusAction | null;
  roundNumber:number|null;
  openModal: ({roundNumber,status}:{roundNumber:number,status: InterviewStatusAction}) => void;
  closeModal: () => void;
}

export const useUpdateInterviewStatusStore =
  create<InterviewStatusModalStore>((set) => ({
    isOpen: false,
    status: null,
    roundNumber:null,

    openModal: ({status,roundNumber}) =>
      set({
        isOpen: true,
        status,
        roundNumber
      }),

    closeModal: () =>
      set({
        isOpen: false,
        status: null,
      }),
  }));
