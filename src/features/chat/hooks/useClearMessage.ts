import { clearMessageApi } from "@/api/chat.api"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useChatStore } from "../store/chat.store"

export const useClearChat = () => {
  const queryClient = useQueryClient()
  const { setMessages } = useChatStore()

  return useMutation({
    mutationFn: (conversationId: string) =>
      clearMessageApi(conversationId),

   onMutate: async (conversationId) => {
  await queryClient.cancelQueries({
    queryKey: ["conversation-messages", conversationId],
  })

  const previousMessages = queryClient.getQueryData([
    "conversation-messages",
    conversationId,
  ])

  queryClient.setQueryData(
    ["conversation-messages", conversationId],
    []
  )
  
  // Update Zustand Store
  setMessages([])

  queryClient.invalidateQueries({
  queryKey: ["conversations"],
})

  return { previousMessages }
},

onError: (_err, conversationId, context) => {
  queryClient.setQueryData(
    ["conversation-messages", conversationId],
    context?.previousMessages
  )
  handleRQError(_err.message)
},

  })
}
