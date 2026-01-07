import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/shadcn/avatar"
import { Button } from "@/components/ui/shadcn/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/shadcn/sheet"
import { Menu, MoreVertical } from "lucide-react"
import ChatList from "./chatList"
import { useState } from "react"

type Props = {
  user: string
//   isOnline: boolean
}

export default function ChatHeader({ user }: Props) {
//   const status = isOnline ? "Online" : "Offline"
  const [selectedUser,setSelectedUser]=useState("")


  return (
    <div className="h-14 border-b flex items-center justify-between px-3 bg-background">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-3">
        {/* Mobile toggle */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="p-0 w-[320px]">
            <ChatList onChange={setSelectedUser}/>
          </SheetContent>
        </Sheet>

        {/* Avatar */}
        <Avatar>
          <AvatarImage src="/user.jpg" />
          <AvatarFallback>{}</AvatarFallback>
        </Avatar>

        {/* Name + status */}
        <div className="flex flex-col">
          <p className="font-medium leading-none">{user||selectedUser}</p>
          {/* <span className="text-xs text-muted-foreground">
            {status}
          </span> */}
        </div>
      </div>

      {/* RIGHT SECTION (optional actions) */}
      <Button size="icon" variant="ghost">
        <MoreVertical className="h-5 w-5" />
      </Button>
    </div>
  )
}
