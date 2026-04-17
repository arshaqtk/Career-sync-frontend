import { useEffect } from "react"
import { getSocket } from "@/lib/socket"
import { logger } from "@/lib/logger"
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
      logger.warn("⚠️ Socket disconnected:", reason)
    })

    socket.on("connect_error", (err) => {
      logger.error("❌ Socket connect error:", err.message)
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("connect_error")
    }
  }, [user])

  return null
}