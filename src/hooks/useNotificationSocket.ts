import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { useNotificationStore } from "@/store/notification.store";

export const useNotificationSocket=()=>{
    const socket=getSocket()
     const incrementNotificationCount =
    useNotificationStore((state) => state.incrementNotificationCount);

    useEffect(()=>{
        socket.on("notification:new",()=>{
            incrementNotificationCount();
            console.log("notification count increase")
        });
        return ()=>{
            socket.off("notification:new")
        }
    },[socket,incrementNotificationCount])


}