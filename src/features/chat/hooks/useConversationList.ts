import { useQuery } from "@tanstack/react-query"
import { getConversationListApi } from "@/api/chat.api"

export const useConversationList = ({
  page,
  limit,
  search,
}: {
  page?: number
  limit?: number
  search?: string
}) => {
  return useQuery({
    queryKey: ["conversations", page, limit, search],
    queryFn: () =>
      getConversationListApi({
        page,
        limit,
        search,
      }),

    staleTime: 1000 * 60 * 2, // 2 minutes
     placeholderData: (previousData) => previousData,
    retry: 1,
    refetchOnWindowFocus: false,
  })
}
