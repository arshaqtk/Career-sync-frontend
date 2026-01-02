/**
 * All notification event types used in UI
 */
export type NotificationType =
  // 🔹 Job
  | "JOB_APPLIED"
  | "JOB_STATUS_CHANGED"
  | "JOB_CLOSED"

  // 🔹 Interview
  | "INTERVIEW_SCHEDULED"
  | "INTERVIEW_RESCHEDULED"
  | "INTERVIEW_CANCELLED"
  | "INTERVIEW_COMPLETED"

  // 🔹 Account / Admin
  | "ACCOUNT_BLOCKED"
  | "ACCOUNT_UNBLOCKED"

  // 🔹 Reports
  | "REPORT_CREATED"
  | "REPORT_UPDATED"
  | "REPORT_RESOLVED"

  // 🔹 System
  | "SYSTEM_ANNOUNCEMENT"

/**
 * Entity the notification points to
 */
export type NotificationEntityType =
  | "job"
  | "interview"
  | "user"
  | "report"

/**
 * Frontend-safe Notification object
 */
export interface Notification {
  _id: string

  recipientId: string
  senderId?: string

  type: NotificationType

  title: string
  message: string

  entityType?: NotificationEntityType
  entityId?: string

  isRead: boolean

  createdAt: string
  updatedAt: string
}
