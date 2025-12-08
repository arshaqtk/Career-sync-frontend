import { create } from "zustand";
import type { Experience } from "../types/Experience.types";

interface ExperienceModalStore {
  isOpen: boolean;
  selectedExperience?: Experience | null;

  openModal: (experience?: Experience) => void;
  closeModal: () => void;
}

export const ExperienceModalStore = create<ExperienceModalStore>((set) => ({
  isOpen: false,
  selectedExperience: null,

  openModal: (experience) =>
    set({ isOpen: true, selectedExperience: experience ?? null }),

  closeModal: () =>
    set({ isOpen: false, selectedExperience: null }),
}));
