import { handleRQError } from "@/lib/react-query/errorHandler"
import { EmptyNotifications } from "../components/EmptyNotification"
import { NotificationList } from "../components/NotificationList"
import NotificationSkeleton from "../components/NotificationSkelton"
import { useFetchNotifications } from "../hooks/useGetNotifications"
import useMarkAllNotificationsRead from "../hooks/useMarkAllNotificationsRead"

export function NotificationPage(){
 const { data, isLoading ,error} = useFetchNotifications()
  const { mutate:markAllAsRead } = useMarkAllNotificationsRead()

 if (isLoading) return <NotificationSkeleton />
  if(error)handleRQError(error)

return (
      <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Notifications</h1>

        <button
          onClick={()=>markAllAsRead()}
          className="text-sm text-blue-600 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {data.length === 0 ? (
        <EmptyNotifications />
      ) : (
        <NotificationList notifications={data} />
      )}
    </div>
)



}