import { create } from "zustand";
import type { Education } from "../types/Education.types";

interface EducationModalStore {
  isOpen: boolean;
  selectedEducation?: Education | null;

  openModal: (education?: Education) => void;
  closeModal: () => void;
}

export const EducationModalStore = create<EducationModalStore>((set) => ({
  isOpen: false,
  selectedExperience: null,

  openModal: (education) =>
    set({ isOpen: true, selectedEducation: education ?? null }),

  closeModal: () =>
    set({ isOpen: false, selectedEducation: null }),
}));
