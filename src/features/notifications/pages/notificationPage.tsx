import { handleRQError } from "@/lib/react-query/errorHandler"
import { EmptyNotifications } from "../components/EmptyNotification"
import { NotificationList } from "../components/NotificationList"
import NotificationSkeleton from "../components/NotificationSkelton"
import { useFetchNotifications } from "../hooks/useGetNotifications"
import useMarkAllNotificationsRead from "../hooks/useMarkAllNotificationsRead"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Bell,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Filter
} from "lucide-react"
import { Button } from "@/components/ui/shadcn/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import type { Notification } from "../types/notification.types"

export function NotificationPage() {
  const [page, setPage] = useState(1)
  const [activeTab, setActiveTab] = useState("all")
  const limit = 10

  const { data, isLoading, error } = useFetchNotifications(page, limit)
  const { mutate: markAllAsRead, isPending: isMarkingRead } = useMarkAllNotificationsRead()

  if (isLoading) return <NotificationSkeleton />
  if (error) {
    handleRQError(error)
    return null
  }

  const { notifications, pagination } = data

  const filteredNotifications = activeTab === "unread"
    ? notifications.filter((n: Notification) => !n.isRead)
    : notifications

  const hasNextPage = page < pagination.totalPages
  const hasPrevPage = page > 1

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-none shadow-xl bg-background/60 backdrop-blur-md">
          <CardHeader className="pb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold tracking-tight">Updates</CardTitle>
                  <p className="text-sm text-muted-foreground">Stay informed about your career journey</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => markAllAsRead()}
                disabled={isMarkingRead || notifications.every((n: Notification) => n.isRead)}
                className="group"
              >
                <CheckCheck className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Mark all as read
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full max-w-xs">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread" className="relative">
                    Unread
                    {notifications.some((n:Notification ) => !n.isRead) && (
                      <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
                    )}
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button variant="ghost" size="icon" className="md:hidden">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            <AnimatePresence mode="wait">
              {filteredNotifications.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <EmptyNotifications />
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <NotificationList notifications={filteredNotifications} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{(page - 1) * limit + 1}</span> to{" "}
                  <span className="font-medium text-foreground">
                    {Math.min(page * limit, pagination.totalNotifications)}
                  </span>{" "}
                  of <span className="font-medium text-foreground">{pagination.totalNotifications}</span> notifications
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={!hasPrevPage}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center justify-center min-w-[32px] font-medium text-sm">
                    {page} / {pagination.totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={!hasNextPage}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
