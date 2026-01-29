import { useNavigate } from "react-router-dom"
import { cn, formatTimeAgo } from "@/lib/utils"
import type { Notification } from "../types/notification.types"
import {
  Briefcase,
  Calendar,
  ShieldAlert,
  Flag,
  Bell,
  Circle,
  MessageSquare
} from "lucide-react"
import { Card } from "@/components/ui/shadcn/card"

const getIcon = (type: string) => {
  if (type.startsWith("JOB_")) return <Briefcase className="h-5 w-5 text-blue-500" />
  if (type.startsWith("INTERVIEW_")) return <Calendar className="h-5 w-5 text-purple-500" />
  if (type.startsWith("ACCOUNT_")) return <ShieldAlert className="h-5 w-5 text-red-500" />
  if (type.startsWith("REPORT_")) return <Flag className="h-5 w-5 text-orange-500" />
  if (type.startsWith("SYSTEM_")) return <Bell className="h-5 w-5 text-yellow-500" />
  return <MessageSquare className="h-5 w-5 text-gray-500" />
}

export function NotificationItem({ notification }: { notification: Notification }) {
  const navigate = useNavigate()

  const handleClick = () => {
    if (notification.entityType === "interview") {
      navigate(`/interviews/${notification.entityId}`)
    } else if (notification.entityType === "job") {
      navigate(`/jobs/${notification.entityId}`)
    }
  }

  return (
    <Card
      onClick={handleClick}
      className={cn(
        "group relative cursor-pointer overflow-hidden border-l-4 transition-all duration-200 hover:shadow-md active:scale-[0.99]",
        notification.isRead
          ? "border-l-transparent bg-white opacity-80"
          : "border-l-primary bg-primary/5 shadow-sm"
      )}
    >
      <div className="flex items-start gap-4 p-4">
        <div className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors",
          notification.isRead ? "bg-muted" : "bg-white shadow-sm"
        )}>
          {getIcon(notification.type)}
        </div>

        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className={cn(
              "text-sm font-semibold leading-none tracking-tight",
              !notification.isRead && "text-primary"
            )}>
              {notification.title}
            </h3>
            <span className="text-[10px] text-muted-foreground font-medium">
              {formatTimeAgo(notification.createdAt)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {notification.message}
          </p>
        </div>

        {!notification.isRead && (
          <div className="absolute top-4 right-4">
            <Circle className="h-2 w-2 fill-primary text-primary animate-pulse" />
          </div>
        )}
      </div>

      {!notification.isRead && (
        <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
      )}
    </Card>
  )
}
