import { getSocket } from "@/lib/socket"
import { useChatStore } from "../store/chat.store"
import MessageBubble from "./MessageBubble"
import MessageInput from "./MessageInput"
import { useEffect, useRef } from "react"
import type { ChatMessage } from "../types/chat.types"
import { useAuthStore } from "@/store/auth.store"
import { useMessageHistory } from "../hooks/useMessages"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar"

import useUserData from "@/hooks/useUserData"
import { ChatActionsDropdown } from "./chatActionsDropdown"
import { useClearChat } from "../hooks/useClearMessage"
import { useDeleteConversation } from "../hooks/useDeleteConversation"
import { useBlockUser, useUnblockUser } from "../hooks/useBlockUser"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet"
import { Button } from "@/components/ui/shadcn/button"
import { Menu, ShieldAlert } from "lucide-react"
import ChatList from "./chatList"
export default function ChatWindow({ isOnline }: { isOnline: boolean }) {
  const { activeChatUser } = useChatStore()
  const selectedUser = activeChatUser?.name
  const avatarUrl = activeChatUser?.profilePicture
  
  const socket = getSocket()
  const bottomRef = useRef<HTMLDivElement | null>(null)
  const { data: profile } = useUserData()
  const storedUser = useAuthStore((s) => s.user)

  const userId = storedUser?.id|| profile?.id

  const { messages, addMessage, activeChatId, conversationId, setMessages, isBlockedByMe, isMeBlocked } = useChatStore()
  const { data: messageHistory, isLoading, isError, error } = useMessageHistory(conversationId!)
  const { mutate: clearChat, isPending } = useClearChat()
  const { mutate: deleteChat, isPending:deletePending } = useDeleteConversation()
  const { mutate: blockUser } = useBlockUser()
  const { mutate: unblockUser } = useUnblockUser()

  const blockedStatus = isBlockedByMe || isMeBlocked;

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
    if (messages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  if (!activeChatId) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select a chat to start messaging
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-muted-foreground animate-pulse">Loading messages...</div>
      </div>
    )
  }

  if (isError) {
    handleRQError(error)
    return (
      <div className="flex items-center justify-center h-full text-destructive">
        Failed to load messages
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full bg-background border-l border-border md:border-l-0">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4 bg-card border-b border-border flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-3">
                  {/* Mobile toggle */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="md:hidden -ml-2 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      >
                        <Menu className="h-6 w-6" />
                      </Button>
                    </SheetTrigger>
          
                    <SheetContent side="left" className="p-0 w-[320px] bg-background border-r border-border">
                      <ChatList />
                    </SheetContent>
                  </Sheet>
                </div>
          <div className="relative">
            <Avatar className="h-10 w-10 border border-border shadow-sm">
              <AvatarImage src={avatarUrl || "/user-placeholder.jpg"} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold">
                {selectedUser ? selectedUser.charAt(0).toUpperCase() : "?"}
              </AvatarFallback>
            </Avatar>
            {isOnline && (
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-card" />
            )}
          </div>
          <div>
            <h2 className="text-base font-bold text-foreground truncate max-w-[150px] sm:max-w-xs transition-colors">
              {selectedUser || "Chat"}
            </h2>
              {isOnline ? (
                <p className="text-[11px] text-emerald-500 font-bold flex items-center gap-1.5 animate-in fade-in slide-in-from-left-1 duration-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse ring-2 ring-emerald-500/20" />
                  Online
                </p>
              ) : (
                <p className="text-[11px] text-muted-foreground font-medium">Offline</p>
              )}
            
          </div>
        </div>

        <div className="flex items-center gap-1">
         <ChatActionsDropdown disabled={!storedUser && !selectedUser ||isPending||deletePending}
           isBlocked={isBlockedByMe}
           onBlock={() => blockUser({ conversationId: conversationId!, targetUserId: activeChatId! })}
           onUnblock={() => unblockUser({ conversationId: conversationId!, targetUserId: activeChatId! })}
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
      <div className="flex-1 overflow-y-auto bg-muted/5 scrollbar-hide">
        {blockedStatus && (
           <div className="px-6 py-4 bg-orange-50/50 border-b border-orange-100 flex items-center justify-center gap-2 text-[13px] font-medium text-orange-700">
             <ShieldAlert className="h-4 w-4" />
             {isBlockedByMe ? "You have blocked this conversation" : "This conversation is blocked"}
           </div>
        )}
        <div className="px-6 py-10 space-y-8 min-h-full flex flex-col justify-end max-w-6xl mx-auto">
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
      <div className="flex-shrink-0 bg-card border-t border-border p-4 sm:p-6">
        <div className="max-w-4xl mx-auto w-full">
          <MessageInput disabled={!!blockedStatus} />
        </div>
      </div>
    </div>
  )
}