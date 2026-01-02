import type { Notification } from "../types/notification.types";
import { NotificationItem } from "./NotificationItem";

export function NotificationList({ notifications }:{notifications:Notification[]}) {
  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification._id}
          notification={notification}
        />
      ))}
    </div>
  )
}
