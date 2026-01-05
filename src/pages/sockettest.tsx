import { useEffect, useState } from "react"
import { getSocket } from "@/lib/socket"

export default function ChatTest() {
  const [conversationId, setConversationId] = useState("")
  const [receiverId, setReceiverId] = useState("")
  const [message, setMessage] = useState("")
const socket = getSocket()
  useEffect(() => {
    socket.on("chat:newMessage", (msg) => {
      console.log("📩 New Message:", msg)
    })

    return () => {
      socket.off("chat:newMessage")
    }
  }, [])

  const joinConversation = () => {
      console.log("JOIN CLICKED, socket.connected =", socket.connected)
    socket.emit(
      "chat:joinConversation",
      receiverId,
      (res: { success: boolean; conversationId?: string; message?: string }) => {
        console.log("JOIN RESPONSE:", res)
        if (res.success && res.conversationId) {
          setConversationId(res.conversationId)
        }
      }
    )
  }

  const sendMessage = () => {
      console.log("🚀 Sending message", {
    conversationId,
    receiverId,
    message,
  })
    socket.emit(
      "chat:sendMessage",
      {
        conversationId,
        receiverId,
        content: message,
      },
      (res: { success: boolean; message?: string }) => {
        console.log("SEND ACK:", res)
      }
    )
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat Socket Test</h2>

      <input
        placeholder="Receiver User ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />

      <br /><br />

      <button onClick={()=>joinConversation()} className="border bg-red-700">Join Conversation</button>

      <br /><br />

      <input
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <br /><br />

      <button onClick={sendMessage}>Send Message</button>

      <br /><br />

      <p><b>Conversation ID:</b> {conversationId}</p>
    </div>
  )
}
