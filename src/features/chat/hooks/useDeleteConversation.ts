import { deleteConversationApi } from "@/api/chat.api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useChatStore } from "../store/chat.store"

export const useDeleteConversation = () => {
  const queryClient = useQueryClient()
  const { resetChat } = useChatStore()

  return useMutation({
    mutationFn: (conversationId: string) =>deleteConversationApi(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"]
      })
      resetChat()
    },
  })
}
