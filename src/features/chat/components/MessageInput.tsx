import { useState } from "react"
import { getSocket } from "@/lib/socket"
import { useChatStore } from "../store/chat.store"

export default function MessageInput() {
    const socket=getSocket()
    const {conversationId,activeChatId}=useChatStore()
    const [text, setText] = useState("")

  const send = () => {
    console.log("called")
    console.log(text,conversationId,activeChatId)
    if (!text || !conversationId || !activeChatId) return
    socket.emit("chat:sendMessage",{
        conversationId,
        receiverId:activeChatId,
        content:text,
    },(res:{success:boolean,message?:string})=>{
                console.log(res)
            })
    console.log("SEND MESSAGE:", text)
    setText("")
  }

  return (
    <div className="p-4 border-t flex gap-2">
      <input
        className="flex-1 border px-3 py-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        className="bg-blue-500 text-white px-4 rounded"
        onClick={send}
      >
        Send
      </button>
    </div>
  )
}
