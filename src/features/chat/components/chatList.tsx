import { getSocket } from "@/lib/socket"
import { useChatStore } from "../store/chat.store"
import { useConversationList } from "../hooks/useConversationList"
import { CardSkeleton } from "@/components/Loaders"
import type { Chatlist } from "../types/chat.types"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar"
import { ScrollArea } from "@/components/ui/shadcn/scroll-area"

import { MessageSquareOff } from "lucide-react"
import { cn } from "@/lib/utils"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { usePresenceStore } from "../store/presence.store"

export default function ChatList({ onChange }: { onChange?: (value: { name: string, id: string }) => void }) {
  const socket = getSocket()
  const { presence } = usePresenceStore()
  const {
    setActiveChatId,
    setActiveChatUser,
    setConversationId,
    setMessages,
    activeChatId,
  } = useChatStore()

  const page = 1
  const limit = 10

  const openChat = (receiverId?: string, receiverName?: string, profilePictureUrl?: string) => {
    if (!receiverId || !receiverName) return
    if(onChange) onChange({ name: receiverName, id: receiverId })
    if (receiverId === activeChatId) return
    setActiveChatId(receiverId)
    setConversationId(null)
    setActiveChatUser({ name: receiverName, _id: receiverId, profilePicture:profilePictureUrl })

    socket.emit(
      "chat:joinConversation",
      receiverId,
      (res: { success: boolean; conversationId?: string }) => {
        if (res.success && res.conversationId) {
          setConversationId(res.conversationId)
          setMessages([])
        }
      }
    )
  }

  const { data: conversations, isLoading, isError, error } =
    useConversationList({ page, limit })

  if (isLoading) return <CardSkeleton />
  if (isError) {
    handleRQError(error)
    return <div className="p-4 text-red-500">Failed to load chats</div>
  }
  return (
    <div className="flex flex-col h-full bg-background/50">
      <div className="p-4 pb-2 space-y-3">
        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest pl-1 font-sans">
          Recent Conversations
        </p>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-2 pb-6">
          {conversations.data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center space-y-5 animate-in fade-in duration-500">
              <div className="p-5 bg-muted rounded-full">
                <MessageSquareOff className="w-10 h-10 text-muted-foreground/30" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-bold text-foreground">No messages here</p>
                <p className="text-sm text-muted-foreground max-w-[200px] mx-auto leading-relaxed">
                  Start a conversation with recruiters to see them here.
                </p>
              </div>
            </div>
          ) : (
            conversations.data.map((conv: Chatlist) => {
              const receiverId = conv.receiver?._id;
              const status = presence[receiverId];
              const isOnline = status?.isOnline === true;
              const isActive = activeChatId === conv.receiver?._id

              return (
                <div
                  key={conv._id}
                  onClick={() => openChat(conv.receiver?._id, conv.receiver?.name, conv.receiver?.profilePictureUrl)}
                  className={cn(
                    "group flex items-center gap-4 p-3.5 rounded-xl cursor-pointer transition-all duration-300 border",
                    isActive
                      ? "bg-primary/5 border-primary/20 shadow-sm"
                      : "bg-transparent border-transparent hover:bg-muted/50 hover:border-border/50"
                  )}
                >
                  {/* Avatar Section */}
                  <div className="relative">
                    <Avatar className={cn(
                      "h-12 w-12 border-2 transition-transform group-hover:scale-105 duration-300",
                      isActive ? "border-primary/40" : "border-border/40"
                    )}>
                      <AvatarImage src={conv.receiver?.profilePictureUrl} className="object-cover" />
                      <AvatarFallback className={cn(
                        "text-sm font-bold",
                        isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )}>
                        {conv.receiver?.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {/* Status Indicator */}
                    <div className={cn(
                      "absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-[3px] border-background shadow-sm transition-colors",
                      isOnline ? "bg-emerald-500" : "bg-muted-foreground/30"
                    )} />
                  </div>

                  {/* Chat Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className={cn(
                        "font-bold truncate text-[14.5px] transition-colors",
                        isActive ? "text-primary" : "text-foreground group-hover:text-primary/80"
                      )}>
                        {conv.receiver?.name}
                      </p>

                      {conv.lastMessageAt && (
                        <span className="text-[10px] font-semibold text-muted-foreground/60 tabular-nums">
                          {new Date(conv.lastMessageAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <p className={cn(
                        "text-[13px] truncate pr-2 line-clamp-1 h-5",
                        isActive ? "text-primary/70 font-medium" : "text-muted-foreground group-hover:text-foreground/70"
                      )}>
                        {conv.lastMessage || <span className="italic opacity-60">Send your first message</span>}
                      </p>
                      {isActive && (
                        <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
