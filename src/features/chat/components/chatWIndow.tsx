import { getSocket } from "@/lib/socket"
import { useChatStore } from "../store/chat.store"
import MessageBubble from "./MessageBubble"
import MessageInput from "./MessageInput"
import { useEffect, useRef } from "react"
import type { ChatMessage } from "../types/chat.types"
import { useAuthStore } from "@/store/auth.store"
import { useMessageHistory } from "../hooks/useMessages"
import { handleRQError } from "@/lib/react-query/errorHandler"

export default function ChatWindow({selectedUser}:{selectedUser:string}) {
  const socket = getSocket()
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const userId = useAuthStore((s) => s.user?.id)
  const { messages, addMessage, activeChatId, conversationId, setMessages } = useChatStore()
  
  const { data: messageHistory, isLoading, isError, error } = useMessageHistory(conversationId!)
  
  useEffect(() => {
    const handler = (msg: ChatMessage) => {
      addMessage(msg)
    }

    socket.on("chat:newMessage", handler)
    
    return () => {
      socket.off("chat:newMessage", handler)
    }
  }, [])

  useEffect(() => {
    if (messageHistory) {
      setMessages(messageHistory)
    }
  }, [messageHistory])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])
 
  if (!activeChatId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a chat to start messaging
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-500">Loading messages...</div>
      </div>
    )
  }

  if (isError) {
    handleRQError(error)
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Failed to load messages
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 border-b bg-white">
        <h2 className="text-lg font-semibold text-gray-900">{selectedUser?selectedUser:"Chat"}</h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="px-4 py-6 space-y-2">
          {messages?.map((msg, i) => (
            <MessageBubble 
              key={i} 
              text={msg.content} 
              mine={msg.senderId === userId} 
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t bg-white">
        <MessageInput />
      </div>
    </div>
  )
}