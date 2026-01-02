import { useNavigate } from "react-router-dom"
import { cn, formatDateTime } from "@/lib/utils"
import type { Notification } from "../types/notification.types"

export function NotificationItem({ notification }:{notification:Notification}) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (!notification.isRead) {
    //   markNotificationAsRead(notification._id)
    }

    if (notification.entityType === "interview") {
      navigate(`/interviews/${notification.entityId}`)
    }
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "cursor-pointer rounded-lg border p-4 transition",
        notification.isRead
          ? "bg-white"
          : "bg-blue-50 border-blue-200"
      )}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{notification.title}</h3>
          <p className="text-sm text-gray-600">
            {notification.message}
          </p>
        </div>

        {!notification.isRead && (
          <span className="h-2 w-2 bg-blue-600 rounded-full mt-1" />
        )}
      </div>

      <p className="text-xs text-gray-400 mt-2">
        {formatDateTime(notification.createdAt)}
      </p>
    </div>
  )
}
