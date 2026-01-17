
import { LogoutApi } from "@/api/auth.api";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: "candidate"|"recruiter";
  isVerified?: boolean;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;

  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}


export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
        

      logout: async() => {
        try{
          await LogoutApi()
        }catch{
          toast.error("Logout failed")
        }
        set({ user: null, isAuthenticated: false });
        
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
