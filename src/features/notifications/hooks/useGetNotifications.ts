import { getMyNotifications } from "@/api/notification.api"
import { useQuery } from "@tanstack/react-query"

export  function useFetchNotifications(page = 1, limit = 10) {
  return useQuery({
 queryKey: ["notifications", page],
    queryFn: () => getMyNotifications({params:{page,limit}}),
    placeholderData:(previousData)=>previousData, 
  })
}