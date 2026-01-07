import { getSocket } from "@/lib/socket"
import ChatLayout from "../components/chatLayout"
import { useEffect, useState } from "react";

export default function ChatPage() {
  const socket=getSocket();
  const [connected, setConnected] = useState(socket.connected)

  useEffect(() => {
    if (!socket.connected) {
      socket.connect()
    }

    socket.on("connect", () => setConnected(true))
    socket.on("disconnect", () => setConnected(false))

    return () => {
      socket.off("connect")
      socket.off("disconnect")
    }
  }, [socket])

  if (!connected) {
    return <div className="p-4 text-center">Connecting to chat…</div>
  }
  return <ChatLayout />
}
