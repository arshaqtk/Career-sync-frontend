import { getSocket } from "@/lib/socket"
import { useChatStore } from "../store/chat.store"
import { useConversationList } from "../hooks/useConversationList"
import { CardSkeleton } from "@/components/Loaders"
import type { Chatlist } from "../types/chat.types"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar"
import { ScrollArea } from "@/components/ui/shadcn/scroll-area"

import { cn } from "@/lib/utils"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { usePresenceStore } from "../store/presence.store"

export default function ChatList({ onChange }: { onChange: (value: {name:string,id:string}) => void }) {
  const socket = getSocket()
  const { presence } = usePresenceStore()
  const {
    setActiveChatId,
    setConversationId,
    setMessages,
    activeChatId,
  } = useChatStore()

  const page = 1
  const limit = 10

  const openChat = (receiverId: string, recieverName: string) => {
    onChange({name:recieverName,id:receiverId})
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

  const { data: conversations, isLoading, isError, error } =
    useConversationList({ page, limit })

  if (isLoading) return <CardSkeleton />
  if (isError) {
    handleRQError(error)
    return <div className="p-4 text-red-500">Failed to load chats</div>
  }
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 pb-2 space-y-3">
        {/* <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-blue-500 rounded-lg"
          />
        </div> */}
        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1 font-sans">
          Recent
        </p>
      </div>

      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 pb-4">
          {conversations.data.map((conv: Chatlist) => {
            const receiverId = conv.receiver._id;
            const status = presence[receiverId];
            const isOnline = status?.isOnline === true;
            const isActive = activeChatId === conv.receiver._id

            return (
              <div
                key={conv._id}
                onClick={() => openChat(conv.receiver._id, conv.receiver.name)}
                className={cn(
                  "group flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border",
                  isActive
                    ? "bg-blue-50/50 border-blue-200 ring-1 ring-blue-100"
                    : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
                )}
              >
                {/* Avatar */}
                <div className="relative">
                  <Avatar className={cn(
                    "h-12 w-12 border transition-all",
                    isActive ? "border-blue-200" : "border-slate-100"
                  )}>
                    <AvatarImage src={conv.receiver.profilePictureUrl} className="object-cover" />
                    <AvatarFallback className={cn(
                      "text-sm font-bold",
                      isActive ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                    )}>
                      {conv.receiver.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {/* Status Indicator */}
                  <div className={cn(
                    "absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white",
                    isOnline ? "bg-green-500" : "bg-slate-400"
                  )} />
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className={cn(
                      "font-bold truncate text-[14px] transition-colors",
                      isActive ? "text-blue-700" : "text-slate-900 group-hover:text-blue-600"
                    )}>
                      {conv.receiver.name}
                    </p>

                    {conv.lastMessageAt && (
                      <span className="text-[10px] font-medium text-slate-400">
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
                      isActive ? "text-blue-600/80 font-medium" : "text-slate-500 group-hover:text-slate-600"
                    )}>
                      {conv.lastMessage || <span className="italic text-xs opacity-70">Start a conversation</span>}
                    </p>
                    {isActive && (
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>

  )
}
