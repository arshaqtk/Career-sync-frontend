import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/shadcn/avatar"
import { Button } from "@/components/ui/shadcn/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet"
import { Menu } from "lucide-react"
import ChatList from "./chatList"
import { useState } from "react"
import { ChatActionsDropdown } from "./chatActionsDropdown"
import { useClearChat } from "../hooks/useClearMessage"
import { useChatStore } from "../store/chat.store"

type Props = {
  user: string
  //   isOnline: boolean
}

export default function ChatHeader({ user }: Props) {
  //   const status = isOnline ? "Online" : "Offline"
  const [selectedUser, setSelectedUser] = useState("")
    const {conversationId } = useChatStore()
  
  const { mutate: clearChat, isPending } = useClearChat()



  return (
    <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4 bg-white sticky top-0 z-50 transition-all duration-300">

      {/* LEFT SECTION */}
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
            <ChatList onChange={setSelectedUser} />
          </SheetContent>
        </Sheet>

        {/* Avatar */}
        <div className="relative">
          <Avatar className="h-10 w-10 border border-slate-100 shadow-sm">
            <AvatarImage src="/user.jpg" />
            <AvatarFallback className="bg-blue-600 text-white font-bold">
              {(user || selectedUser || "?").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 shadow-sm" />
        </div>

        {/* Name + status */}
        <div className="flex flex-col">
          <p className="font-bold text-slate-900 leading-none text-[15px]">{user || selectedUser || "Select a chat"}</p>
          {/* <p className="text-[11px] text-green-600 font-medium mt-1">Online</p> */}
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex items-center gap-1">
        {/* <Button size="icon" variant="ghost" className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full">
          <MoreVertical className="h-5 w-5" />
        </Button> */}
        <ChatActionsDropdown disabled={!user && !selectedUser ||isPending}
  onClear={() => {
    clearChat(conversationId!)
  }}
  onDelete={() => {
    console.log("Chat deleted");
  }}
/>
      </div>
    </div>

  )
}
