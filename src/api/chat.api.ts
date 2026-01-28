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


export const clearMessageApi=async(conversationId:string)=>{
  const response=await api.delete(`/chat/conversations/${conversationId}/messages`)
  return response
}

export const deleteConversationApi=async(conversationId:string)=>{
  alert("delete chat called")
  const response=await api.delete(`/chat/conversations/${conversationId}`)
  return response
}