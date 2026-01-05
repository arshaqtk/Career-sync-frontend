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
