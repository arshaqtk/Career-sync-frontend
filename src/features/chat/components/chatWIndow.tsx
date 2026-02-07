import { getSocket } from "@/lib/socket"
import { useChatStore } from "../store/chat.store"
import MessageBubble from "./MessageBubble"
import MessageInput from "./MessageInput"
import { useEffect, useRef, type Dispatch, type SetStateAction } from "react"
import type { ChatMessage } from "../types/chat.types"
import { useAuthStore } from "@/store/auth.store"
import { useMessageHistory } from "../hooks/useMessages"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar"

import useUserData from "@/hooks/useUserData"
import { ChatActionsDropdown } from "./chatActionsDropdown"
import { useClearChat } from "../hooks/useClearMessage"
import { useDeleteConversation } from "../hooks/useDeleteConversation"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet"
import { Button } from "@/components/ui/shadcn/button"
import { Menu } from "lucide-react"
import ChatList from "./chatList"
export default function ChatWindow({ isOnline,setSelectedUser,selectedUser }: 
  {isOnline:boolean,setSelectedUser:Dispatch<SetStateAction<{ name: string; id: string; }>>,selectedUser: string }) {
  
  
  const socket = getSocket()
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const { data: profile } = useUserData()
  const storedUser = useAuthStore((s) => s.user)

  const userId = storedUser?.id|| profile?.id

  const { messages, addMessage, activeChatId, conversationId, setMessages } = useChatStore()
  const { data: messageHistory, isLoading, isError, error } = useMessageHistory(conversationId!)
  const { mutate: clearChat, isPending } = useClearChat()
  const { mutate: deleteChat, isPending:deletePending } = useDeleteConversation()


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
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-3 bg-white border-b border-slate-100 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-3">
                  {/* Mobile toggle */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="md:hidden -ml-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      >
                        <Menu className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
          
                    <SheetContent side="left" className="p-0 w-[320px]">
                      <ChatList onChange={({name,id})=>setSelectedUser({name,id})} />
                    </SheetContent>
                  </Sheet>
                </div>
          <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
            <AvatarImage src="/user-placeholder.jpg" />
            <AvatarFallback className="bg-blue-50 text-blue-700 font-bold">
              {selectedUser ? selectedUser.charAt(0).toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {selectedUser || "Chat"}
            </h2>
              {isOnline?<p className="text-[11px] text-green-600 font-medium">Online</p>:
              <p className="text-[11px] text-gray-600 font-medium">Offline</p>}
            
          </div>
        </div>

        <div className="flex items-center gap-1">
         <ChatActionsDropdown disabled={!storedUser && !selectedUser ||isPending||deletePending}
           onClear={() => {
             clearChat(conversationId!)
           }}
           onDelete={() => {
             deleteChat(conversationId!)
           }}
         />
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto bg-slate-50/50 scrollbar-hide">
        <div className="px-6 py-6 space-y-4 min-h-full flex flex-col justify-end">
          {messages?.map((msg, i) => {
            const msgSenderId = msg.senderId
             
            const isMine =
              msgSenderId && (
                (userId && msgSenderId === userId) ||
                (activeChatId && msgSenderId !== activeChatId)
              );

            return (
              <MessageBubble
                key={msg._id || i}
                text={msg.content}
                mine={!!isMine}
              />
            )
          })}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 bg-white border-t border-slate-100 p-3 md:p-4">
        <MessageInput />
      </div>
    </div>
  )
}