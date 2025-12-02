import { create } from "zustand";

interface RoleStore {
  role: "admin"|"recruiter"| "candidate";
  setSelectedRole: (role: "admin"|"recruiter"| "candidate") => void;
}

interface RegisterRoleStore{
   role: "recruiter"| "candidate";
  setSelectedRole: (role:"recruiter"| "candidate") => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  role: "candidate",   
  setSelectedRole: (role) => set({ role }),
}));

export const useRegisterRoleStore = create<RegisterRoleStore>((set) => ({
  role: "candidate",   
  setSelectedRole: (role) => set({ role }),
}));