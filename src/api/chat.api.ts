import api from "./apiClient"

export type ConversationListQuery = {
  page?: number
  limit?: number
  search?: string
}

export const getConversationListApi = async (
  query: ConversationListQuery
) => {
  const { data } = await api.get("/chat/conversations", {
    params: query,
  })
  return data
}


export const getMessagesHistoryApi = async (conversationId:string) => {
  const { data } = await api.get(`/chat/conversations/${conversationId}/messages`, {
})

  return data.data
}
