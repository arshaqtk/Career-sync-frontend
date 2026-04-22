import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ChatMessage } from "../types/chat.types"

type ChatState = {
  activeChatId: string | null
  activeChatUser: { name: string; _id: string; profilePicture?: string } | null
  conversationId: string | null
  isBlockedByMe: boolean
  isMeBlocked: boolean
  messages: ChatMessage[]

  setActiveChatId: (id: string | null) => void
  setActiveChatUser: (user: { name: string; _id: string; profilePicture?: string } | null) => void
  setConversationId: (id: string | null) => void
  setBlockedState: ({ blockedByMe, meBlocked }: { blockedByMe: boolean; meBlocked: boolean }) => void
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
      isBlockedByMe: false,
      isMeBlocked: false,
      messages: [],

      setActiveChatId: (id) => set({ activeChatId: id }),
      setActiveChatUser: (user) => set({ activeChatUser: user }),
      setConversationId: (id) => set({ conversationId: id }),
      setBlockedState: ({ blockedByMe, meBlocked }) => set({ isBlockedByMe: blockedByMe, isMeBlocked: meBlocked }),

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
          isBlockedByMe: false,
          isMeBlocked: false,
          messages: [],
        }),
    }),
    {
      name: "chat-storage", // unique name for the storage
    }
  )
)