import { getMyNotifications } from "@/api/notification.api"
import { useQuery } from "@tanstack/react-query"

export  function useFetchNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getMyNotifications,
    staleTime:1000*30,
    refetchOnWindowFocus: false
  })
}