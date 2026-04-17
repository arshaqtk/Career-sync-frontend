import { io, Socket } from "socket.io-client"
import { logger } from "./logger"

let socket: Socket | null = null

export const getSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL, {
      withCredentials: true,
      autoConnect: false,

      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 10000,
      timeout: 20000,
      transports: ["polling", "websocket"],
    })
  }
  return socket
}


export const registerSocketListeners = () => {
  socket?.on("connect", () => {
  })

  socket?.on("connect_error", (err) => {
    logger.error("❌ Socket error:", err.message)
  })
}