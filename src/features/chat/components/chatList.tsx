import { getSocket } from "@/lib/socket"
import { useChatStore } from "../store/chat.store"
import { useConversationList } from "../hooks/useConversationList"
import { CardSkeleton } from "@/components/Loaders"
import type { Chatlist } from "../types/chat.types"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar"
import { ScrollArea } from "@/components/ui/shadcn/scroll-area"
import { cn } from "@/lib/utils"
import { handleRQError } from "@/lib/react-query/errorHandler"

export default function ChatList() {
  const socket = getSocket()

  const {
    setActiveChatId,
    setConversationId,
    setMessages,
    activeChatId,
  } = useChatStore()

  const page = 1
  const limit = 10

  const openChat = (receiverId: string) => {
    if (receiverId === activeChatId) return

    setActiveChatId(receiverId)

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

  const { data: conversations, isLoading, isError,error } =
    useConversationList({ page, limit })

  if (isLoading) return <CardSkeleton />
  if (isError) {handleRQError(error) 
    return <div className="p-4 text-red-500">Failed to load chats</div>}

  return (
    <div className="h-full border-r bg-background">
      <h3 className="px-4 py-3 text-lg font-semibold border-b">Chats</h3>

      <ScrollArea className="h-[calc(100vh-64px)]">
        {conversations.data.map((conv: Chatlist) => {
          const isActive = activeChatId === conv.receiver._id

          return (
            <div
              key={conv._id}
              onClick={() => openChat(conv.receiver._id)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors",
                "hover:bg-muted/60",
                isActive && "bg-muted"
              )}
            >
              {/* Avatar */}
              <Avatar className="h-10 w-10">
                <AvatarImage src={conv.receiver.profilePictureUrl} />
                <AvatarFallback>
                  {conv.receiver.name?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">
                    {conv.receiver.name}
                  </p>

                  {conv.lastMessageAt && (
                    <span className="text-xs text-muted-foreground">
                      {new Date(conv.lastMessageAt).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  )}
                </div>

                <p className="text-sm text-muted-foreground truncate">
                  {conv.lastMessage || "No messages yet"}
                </p>
              </div>
            </div>
          )
        })}
      </ScrollArea>
    </div>
  )
}
