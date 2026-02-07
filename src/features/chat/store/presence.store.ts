import { create } from "zustand";


type PresenceState={
    presence:Record<string,{
        isOnline:boolean,
        lastSeen?:string;
    }>;
    setOnline:(userId:string)=>void;
    setOffline:(userId:string,lastSeen?:string)=>void;
    reset:()=>void;
}

export const usePresenceStore = create<PresenceState>((set) => ({
  presence: {},

  setOnline: (userId) =>
    set((state) => ({
      presence: {
        ...state.presence,
        [userId]: { isOnline: true }
      }
    })),

  setOffline: (userId, lastSeen) =>
    set((state) => ({
      presence: {
        ...state.presence,
        [userId]: { isOnline: false, lastSeen }
      }
    })),

  reset: () => set({ presence: {} })
}));