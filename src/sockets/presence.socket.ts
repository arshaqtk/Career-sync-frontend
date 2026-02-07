import { getSocket } from "@/lib/socket"
import { usePresenceStore } from "@/features/chat/store/presence.store";

export const initPresenceSocket=()=>{
     const socket = getSocket()
    const {setOnline,setOffline}=usePresenceStore.getState();
    
    socket.on("user-online",({userId})=>{
        setOnline(userId);
    });
    socket.on("user-offline",({userId,lastSeen})=>{
        setOffline(userId,lastSeen);
    });
 };