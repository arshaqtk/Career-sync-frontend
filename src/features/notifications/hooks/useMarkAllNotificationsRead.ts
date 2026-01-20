import { markAllNotificationsAsRead } from "@/api/notification.api"
import { QUERY_KEYS } from "@/config/queryKeys"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { useNotificationStore } from "@/store/notification.store"
import {  useMutation, useQueryClient } from "@tanstack/react-query"

export default function useMarkAllNotificationsRead() {
  const {resetNotificationCount}=useNotificationStore()
    const queryClient=useQueryClient()
    return useMutation({
        
  mutationFn: markAllNotificationsAsRead,
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey:["notifications"]})
    queryClient.invalidateQueries({queryKey:[QUERY_KEYS.user]})
    resetNotificationCount()
  },
  onError:handleRQError
})
}