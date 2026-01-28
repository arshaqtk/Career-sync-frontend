import { deleteConversationApi } from "@/api/chat.api"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteConversation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (conversationId: string) =>deleteConversationApi(conversationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["conversations"]
      })
    },
  })
}
