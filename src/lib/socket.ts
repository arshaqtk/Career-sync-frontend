import { io, Socket } from "socket.io-client"

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
    console.log("✅ Socket connected:", socket?.id)
  })

  socket?.on("connect_error", (err) => {
    console.error("❌ Socket error:", err.message)
  })
}