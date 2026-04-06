import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ChatMessage } from "../types/chat.types"

type ChatState = {
  activeChatId: string | null
  activeChatUser: { name: string; _id: string; profilePicture?: string } | null
  conversationId: string | null
  messages: ChatMessage[]

  setActiveChatId: (id: string | null) => void
  setActiveChatUser: (user: { name: string; _id: string; profilePicture?: string } | null) => void
  setConversationId: (id: string | null) => void
  addMessage: (msg: ChatMessage) => void
  setMessages: (msgs: ChatMessage[]) => void
  resetChat: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      activeChatId: null,
      activeChatUser: null,
      conversationId: null,
      messages: [],

      setActiveChatId: (id) => set({ activeChatId: id }),
      setActiveChatUser: (user) => set({ activeChatUser: user }),
      setConversationId: (id) => set({ conversationId: id }),

      addMessage: (msg) =>
        set((state) => {
          if (state.messages.some((m) => m._id === msg._id)) {
            return state
          }
          return { messages: [...state.messages, msg] }
        }),
      setMessages: (msgs) => set({ messages: msgs }),
      resetChat: () =>
        set({
          activeChatId: null,
          activeChatUser: null,
          conversationId: null,
          messages: [],
        }),
    }),
    {
      name: "chat-storage", // unique name for the storage
    }
  )
)