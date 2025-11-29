import { create } from "zustand";

interface RoleStore {
  role: "admin"|"recruiter"| "candidate";
  setSelectedRole: (role: "admin"|"recruiter"| "candidate") => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  role: "candidate",   
  setSelectedRole: (role) => set({ role }),
}));