import type { Notification } from "../types/notification.types";
import { NotificationItem } from "./NotificationItem";
import { motion } from "motion/react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
}
export function NotificationList({ notifications }:{notifications:Notification[]}) {
  return (
   <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-3"
    >
      {notifications.map((notification) => (
        <motion.div key={notification._id} variants={item}>
          <NotificationItem
            notification={notification}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
