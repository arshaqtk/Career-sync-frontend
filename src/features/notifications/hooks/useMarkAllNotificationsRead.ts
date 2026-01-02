import { markAllNotificationsAsRead } from "@/api/notification.api"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { QueryClient, useMutation } from "@tanstack/react-query"

export default function useMarkAllNotificationsRead() {
    const queryClient=new QueryClient()
    return useMutation({
  mutationFn: markAllNotificationsAsRead,
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey:["notifications"]})
  },
  onError:handleRQError
})
}