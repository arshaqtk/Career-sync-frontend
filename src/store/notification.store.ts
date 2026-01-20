import { create } from "zustand";

type NotificationStore = {
  notificationCount: number;

  // setters
  setNotificationCount: (count: number) => void;
  incrementNotificationCount: () => void;
  resetNotificationCount: () => void;
};
export const useNotificationStore=create<NotificationStore>((set)=>({
    notificationCount:0,
    setNotificationCount:(count)=>set({notificationCount:count}),

    incrementNotificationCount:()=>set((state)=>({
        notificationCount:state.notificationCount+1,
    })),
    resetNotificationCount:()=>
        set({notificationCount:0})

}))