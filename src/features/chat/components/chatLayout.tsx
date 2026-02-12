import ChatList from "../components/chatList"
import ChatWindow from "../components/chatWIndow"
import { useChatStore } from "../store/chat.store"
import {  MessageSquare } from "lucide-react"
import { useState } from "react"
import { usePresenceStore } from "../store/presence.store"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/shadcn/sheet"
// import { Button } from "@/components/ui/shadcn/button"


export default function ChatLayout() {
  const conversationId = useChatStore((s) => s.conversationId)
  const [selectedUser, setSelectedUser] = useState({name:"",id:""})
     const {presence}=usePresenceStore()
     const status = presence[selectedUser.id];
const isOnline = status?.isOnline === true;
  
   return (
    <div className="h-[calc(100dvh-64px)] flex overflow-hidden bg-white">
   
      {/* Desktop Sidebar */}
      <aside className="w-[380px] border-r border-slate-200 bg-white hidden md:flex flex-col z-10">
        <div className="p-6 border-b border-slate-100 bg-white">
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <MessageSquare className="h-6 w-6" />
            </div>
            Messages
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-2 px-1">
            {conversationId ? "Active Conversation" : "Connect & Chat"}
          </p>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <ChatList onChange={({name,id})=>setSelectedUser({name,id})} />
        </div>
      </aside>
       

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-white">
        {/* Mobile Header */}
        {conversationId ? (
          <div className="flex-1 flex flex-col h-full relative z-0">
            <ChatWindow isOnline={isOnline} setSelectedUser={setSelectedUser} selectedUser={selectedUser.name} />
          </div>
        ) : (
          <div>
 <div className="md:hidden">
             <ChatList onChange={({name,id})=>setSelectedUser({name,id})} />
          </div>
          <div className="flex-1 hidden md:flex flex-col items-center justify-center p-8 bg-slate-50/30">
            <div className="max-w-md  w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center space-y-8 animate-in fade-in zoom-in duration-500">
              <div className="relative mx-auto w-24 h-24">
                <div className="relative w-full h-full rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                  <MessageSquare className="h-10 w-10 text-white" />
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                  Welcome to Messages
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Select a conversation from the sidebar to start chatting with your network.
                </p>
              </div>

              <div className="grid gap-3 pt-4 text-left">
                {[
                  "Real-time messaging",
                  "Secure conversations",
                  "Instant notifications"
                ].map((tip, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 hover:bg-white hover:shadow-sm transition-all duration-200">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="font-medium text-sm">{tip}</span>
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