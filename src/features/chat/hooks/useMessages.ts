import { getMessagesHistoryApi } from "@/api/chat.api";
import  { useQuery } from "@tanstack/react-query";

export const useMessageHistory=(conversationId:string)=>{
    return useQuery({
        queryKey: ["conversation-messages", conversationId],
        queryFn:()=>getMessagesHistoryApi(conversationId!),
        placeholderData: (previousData) => previousData,
        enabled:!!conversationId,
        staleTime: 1000 * 60,
    })
}