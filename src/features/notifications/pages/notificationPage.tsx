import { handleRQError } from "@/lib/react-query/errorHandler"
import { EmptyNotifications } from "../components/EmptyNotification"
import { NotificationList } from "../components/NotificationList"
import NotificationSkeleton from "../components/NotificationSkelton"
import { useFetchNotifications } from "../hooks/useGetNotifications"
import useMarkAllNotificationsRead from "../hooks/useMarkAllNotificationsRead"
import { useState } from "react"

export function NotificationPage(){
  const [page, setPage] = useState(1)
   const limit = 10
 const { data, isLoading ,error} = useFetchNotifications(page, limit)
  const { mutate:markAllAsRead } = useMarkAllNotificationsRead()
 if (isLoading) return <NotificationSkeleton />
  if(error)handleRQError(error)
  const hasNextPage = data.length === limit
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

{/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="px-4 py-2 text-sm rounded border disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {page}
        </span>

        <button
          disabled={!hasNextPage}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 text-sm rounded border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>

)



}