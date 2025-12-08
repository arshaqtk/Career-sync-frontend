import { create } from "zustand";

interface SkillModalStore {
  isOpen: boolean;

  openModal: () => void;
  closeModal: () => void;
}

export const SkillModalStore = create<SkillModalStore>((set) => ({
  isOpen: false,
  selectedExperience: null,

  openModal: () =>
    set({ isOpen: true }),

  closeModal: () =>
    set({ isOpen: false }),
}));
