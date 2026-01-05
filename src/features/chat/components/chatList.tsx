import { getSocket } from "@/lib/socket"
import { useChatStore } from "../store/chat.store"
import { useConversationList } from "../hooks/useConversationList"
import { CardSkeleton } from "@/components/Loaders"


export default function ChatList() {

    const socket=getSocket()
    const {setActiveChatId,setConversationId,setMessages}=useChatStore()
    const page=1
    const limit=10
    const openChat=(recieverId:string)=>{
        setActiveChatId(recieverId)
        setMessages([])
        socket.emit("chat:joinConversation",recieverId,(res:{success:boolean;
            conversationId?:string})=>{
                console.log(res)
                if(res.success&&res.conversationId){
                    setConversationId(res.conversationId)
                }
            })
    }
    const {data:conversations,isLoading,isError}=useConversationList({page,limit})
    if(isLoading) return <CardSkeleton/>
    if (isError) return <div>Failed to load chats</div>
    console.log(conversations)
    return (
     <div>
      <h3 className="p-4 font-bold">Chats</h3>
      {conversations.data.map((conv) => (
        <div 
          key={conv._id}
          onClick={() => openChat(conv.receiver._id)}
          className="p-4 cursor-pointer hover:bg-gray-100"
        >
          <div className="font-medium">
            {conv?.receiver?.name}
          </div>

          <div className="text-sm text-gray-500 truncate">
            {conv?.lastMessage || "No messages yet"}
          </div>
        </div>
      ))}
    </div>
  )
}
