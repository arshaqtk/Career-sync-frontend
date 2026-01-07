import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { useChatStore } from "@/features/chat/store/chat.store";
import { getSocket } from "@/lib/socket";
import { useNavigate } from "react-router-dom";

interface Props{
  id:string;
    name:string;
    email:string;
}

export const RecruiterInfoCard=({ name,email,id }: Props)=> {
  const navigate=useNavigate()
  const socket=getSocket()
const {setConversationId,setMessages,setActiveChatId}=useChatStore()
 const openChat = (receiverId: string) => {
  console.log(receiverId)
  if(!socket.connected){
    socket.connect()
  }
    setActiveChatId(receiverId)
    socket.emit(
      "chat:joinConversation",
      receiverId,
      (res: { success: boolean; conversationId?: string }) => {
        console.log(res)
        if (res.success && res.conversationId) {
          setConversationId(res.conversationId)
          setMessages([])
          navigate("/chat")
        }
      }
    )
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruiter</CardTitle>
      </CardHeader>

      <CardContent className="text-sm space-y-1">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
      </CardContent>
       <CardFooter>
    <Button variant="outline" className="w-full" onClick={()=>openChat(id)}>
      Send Message
    </Button>
  </CardFooter>
    </Card>
  )
}
