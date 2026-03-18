import { useEffect } from "react"
import { getSocket } from "@/lib/socket"
import { useAuthStore } from "@/store/auth.store"

export const SocketProvider = () => {
  const user = useAuthStore((s) => s.user)
  const socket = getSocket()

  useEffect(() => {
    if (!user) return

    if (!socket.connected) {
      socket.connect()
    }

    socket.on("connect", () => {
    })

    socket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason)
    })

    socket.on("reconnect_attempt", () => {
    })

    socket.on("reconnect", () => {

      // 🔑 IMPORTANT: rejoin rooms here later
    })

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connect error:", err.message)
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("reconnect")
      socket.off("reconnect_attempt")
      socket.off("connect_error")
    }
  }, [user])

  return null
}