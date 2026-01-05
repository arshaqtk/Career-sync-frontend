import {create} from "zustand"
import type { ChatMessage } from "../types/chat.types"




type ChatState = {
  activeChatId: string | null
  conversationId: string | null
  messages: ChatMessage[]

  setActiveChatId: (id: string | null) => void
  setConversationId: (id: string | null) => void
  addMessage: (msg: ChatMessage) => void
  setMessages: (msgs: ChatMessage[]) => void
  resetChat: () => void
}

export const useChatStore=create<ChatState>((set)=>({
    activeChatId:null,
    conversationId:null,
    messages:[],

    setActiveChatId:(id)=>set({activeChatId:id}),
    setConversationId:(id)=>set({conversationId:id}),

    addMessage:(msg)=>set((state)=>({
        messages:[...state.messages,msg]
    })),
    setMessages:(msgs)=>set({messages:msgs}),
    resetChat:()=>set({
        activeChatId:null,
        conversationId:null,
        messages:[]
    })
}))