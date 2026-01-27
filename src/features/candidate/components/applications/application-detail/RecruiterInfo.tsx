import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { useChatStore } from "@/features/chat/store/chat.store";
import { getSocket } from "@/lib/socket";
import { useNavigate } from "react-router-dom";

interface Props {
  id: string;
  name: string;
  email: string;
}

import { Mail, UserCircle } from "lucide-react";

export const RecruiterInfoCard = ({ name, email, id }: Props) => {
  const navigate = useNavigate()
  const socket = getSocket()
  const { setConversationId, setMessages, setActiveChatId } = useChatStore()

  const openChat = (receiverId: string) => {
    if (!socket.connected) {
      socket.connect()
    }
    setActiveChatId(receiverId)
    socket.emit(
      "chat:joinConversation",
      receiverId,
      (res: { success: boolean; conversationId?: string }) => {
        if (res.success && res.conversationId) {
          setConversationId(res.conversationId)
          setMessages([])
          navigate("/chat")
        }
      }
    )
  }

  return (
    <Card className="border-slate-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b border-slate-100 pb-3">
        <CardTitle className="text-lg font-bold text-slate-900">
          Recruiter Info
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-5 space-y-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
            <UserCircle size={18} />
          </div>
          <div>
            <p className="text-[12px] font-bold text-slate-500 uppercase">Contact Name</p>
            <p className="text-[14px] font-bold text-slate-800">{name}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-slate-100 text-slate-500 rounded-lg">
            <Mail size={18} />
          </div>
          <div>
            <p className="text-[12px] font-bold text-slate-500 uppercase">Email Address</p>
            <p className="text-[14px] font-medium text-slate-600 truncate">{email}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 shadow-sm"
          onClick={() => openChat(id)}
        >
          Send Message
        </Button>
      </CardFooter>
    </Card>
  )
}

