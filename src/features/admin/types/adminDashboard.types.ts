export interface AdminDashboardStats {
  totalUsers: number
  recruiters: number
  candidates: number
  jobs: number
  applicationsLast30Days: number
}

export interface RecruiterOverviewItem {
  id: string
  name: string
  company: string
  jobsPosted: number
  status: "Active" | "Blocked"
  lastActive: string
}

export interface SystemHealthData {
  status: "Stable" | "Warning" | "Critical"
  flaggedJobs: number
  blockedRecruiters: number
  lastIncident: string
}

export interface JobModerationItem {
  id: string
  title: string
  recruiter: string
  reports: number
  status: "Active" | "Flagged" | "Removed"
  postedAt: string
}

export interface SystemLogItem {
  id: string
  action: string
  actor: string
  target?: string
  createdAt: string
}

export interface AdminDashboardResponse {
  stats: AdminDashboardStats
  recruiterOverview: RecruiterOverviewItem[]
  systemHealth: SystemHealthData
  jobModeration: JobModerationItem[]
  recentLogs: SystemLogItem[]
}
