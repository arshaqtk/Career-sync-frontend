import { getSocket } from "@/lib/socket"
import { useChatStore } from "../store/chat.store"
import MessageBubble from "./MessageBubble"
import MessageInput from "./MessageInput"
import { useEffect } from "react"
import type { ChatMessage } from "../types/chat.types"
import { useAuthStore } from "@/store/auth.store"



export default function ChatWindow() {
    const socket = getSocket()
    const userId=useAuthStore((s)=>s.user?.id)
  const { messages, addMessage, activeChatId } = useChatStore()
  console.log(userId)
  console.log(messages)
  useEffect(()=>{
    const handler=(msg:ChatMessage)=>{
        addMessage(msg)
    }

    socket.on("chat:newMessage",handler)

    return ()=>{
        socket.off("chat:newMessage",handler)
    }
  },[])
  
  if (!activeChatId) {
    return <div>Select a chat</div>
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b font-bold">
        Chat
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg,i) => (
          <MessageBubble key={i} text={msg.content} mine={msg.senderId===userId} />
        ))}
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  )
}
