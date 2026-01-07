import ChatList from "../components/chatList"
import ChatWindow from "../components/chatWIndow"
import ChatHeader from "../components/chatHeader"
import { useChatStore } from "../store/chat.store"
import { MessageSquare } from "lucide-react"
import { useState } from "react"

export default function ChatLayout() {
  const conversationId = useChatStore((s) => s.conversationId)
  const [selectedUser,setSelectedUser]=useState("")
  return (
    <div className="h-[calc(100vh-64px)] flex bg-gradient-to-br from-gray-50 to-gray-100/50">
      {/* Desktop Sidebar */}
      <aside className="w-[360px] border-r border-gray-200 bg-white hidden md:flex flex-col shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Messages
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {conversationId ? "Active conversation" : "Select a chat"}
          </p>
        </div>
        <div className="flex-1 overflow-hidden">
          <ChatList onChange={setSelectedUser} />
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white md:bg-transparent">
        {/* Mobile Header */}
        <div className="md:hidden">
          <ChatHeader user={selectedUser} />
        </div>

        {conversationId ? (
          <div className="flex-1 flex flex-col md:m-4 md:rounded-xl md:shadow-lg md:border md:border-gray-200 bg-white overflow-hidden">
            <ChatWindow  selectedUser={selectedUser}/>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="max-w-md text-center space-y-6">
              {/* Icon with gradient background */}
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
              
              {/* Text content */}
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome to Messages
                </h2>
                <p className="text-gray-600">
                  Select a conversation from the sidebar to start chatting
                </p>
              </div>

              {/* Tips section */}
              <div className="bg-blue-50 rounded-lg p-4 text-left space-y-2">
                <p className="text-sm font-semibold text-blue-900">
                  Quick tips:
                </p>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Click on any conversation to view messages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Real-time updates when new messages arrive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Search and filter your conversations easily</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}