import ChatList from "../components/chatList"
import ChatWindow from "../components/chatWIndow"
import { useChatStore } from "../store/chat.store"
import { MessageSquare } from "lucide-react"
import { useState } from "react"
import { usePresenceStore } from "../store/presence.store"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/shadcn/sheet"
// import { Button } from "@/components/ui/shadcn/button"


export default function ChatLayout() {
  const conversationId = useChatStore((s) => s.conversationId)
  const activeChatUser = useChatStore((s) => s.activeChatUser)
  const { presence } = usePresenceStore()
  const status = activeChatUser ? presence[activeChatUser._id] : null;
  const isOnline = status?.isOnline === true;

  return (
    <div className="h-[calc(100dvh-80px)] md:h-[calc(100dvh-64px)] flex overflow-hidden bg-background">
   
      {/* Desktop Sidebar */}
      <aside className="w-[300px] lg:w-[360px] border-r border-border bg-card hidden md:flex flex-col z-10">
        <div className="p-6 border-b border-border bg-card">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <MessageSquare className="h-6 w-6" />
            </div>
            Messages
          </h1>
          <p className="text-sm font-medium text-muted-foreground mt-2 px-1">
            {conversationId ? "Active Conversation" : "Connect & Chat"}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <ChatList />
        </div>
      </aside>
       

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-background">
        {/* Mobile Header / Content */}
        {conversationId ? (
          <div className="flex-1 flex flex-col h-full relative z-0">
            <ChatWindow isOnline={isOnline} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="md:hidden flex-1 overflow-y-auto">
              <ChatList />
            </div>
            <div className="flex-1 hidden md:flex flex-col items-center justify-center p-8 bg-muted/20">
              <div className="w-full max-w-2xl bg-card p-12 rounded-2xl shadow-xl shadow-primary/5 border border-border text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="relative mx-auto w-24 h-24">
                  <div className="relative w-full h-full rounded-2xl bg-primary flex items-center justify-center shadow-lg transform rotate-3 transition-transform hover:rotate-0 duration-300">
                    <MessageSquare className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-card" />
                </div>

                <div className="space-y-3">
                  <h2 className="text-4xl font-extrabold text-foreground tracking-tight">
                    Welcome to Messages
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-md mx-auto">
                    Select a conversation from the sidebar to start chatting with your network.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6">
                  {[
                    { label: "Real-time", color: "bg-blue-500", icon: "💬" },
                    { label: "Secure", color: "bg-emerald-500", icon: "🔒" },
                    { label: "Instant", color: "bg-amber-500", icon: "⚡" }
                  ].map((tip, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-muted/50 border border-border/50 text-foreground hover:bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <span className="text-2xl">{tip.icon}</span>
                      <span className="font-bold text-sm">{tip.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}