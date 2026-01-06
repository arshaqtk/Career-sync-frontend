import ChatList from "../components/chatList"
import ChatWindow from "../components/chatWIndow"
import { useChatStore } from "../store/chat.store"
import { Separator } from "@/components/ui/shadcn/separator"
import { MessageSquare } from "lucide-react"

export default function ChatLayout() {
  const conversationId = useChatStore((s) => s.conversationId)

  return (
    <div className="h-[calc(100vh-64px)] overflow-hidden flex bg-background">
      {/* Sidebar */}
      <aside className="w-[360px] border-r hidden md:flex flex-col">
        <ChatList />
      </aside>

      <Separator orientation="vertical" className="hidden md:block" />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {conversationId ? (
          <ChatWindow />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
            <MessageSquare className="h-12 w-12 mb-4" />
            <p className="text-lg font-medium">No conversation selected</p>
            <p className="text-sm">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
