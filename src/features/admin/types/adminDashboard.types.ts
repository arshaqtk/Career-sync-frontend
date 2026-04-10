export interface AdminDashboardStats {
  totalUsers: number
  recruiters: number
  candidates: number
  totalCompanies: number
  approvedCompanies: number
  pendingCompanies: number
  openJobs: number
  pausedJobs: number
  applicationsLast30Days: number
  applicationsToday: number
}

export interface RecruiterOverviewItem {
  id: string
  name: string
  company: string
  jobsPosted: number
  status: "Active" | "Blocked"
  lastActive: string | null
}

export interface SystemHealthData {
  status: "Stable" | "Warning" | "Critical"
  pendingCompanies: number
  pausedJobs: number
  applicationsToday: number
}

export interface UserGrowthPoint {
  year: number
  month: number
  label: string
  recruiters: number
  candidates: number
  total: number
}

export interface ActivityDataPoint {
  date: string
  label: string
  count: number
}

export interface DistributionPoint {
  name: string
  value: number
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
  charts: {
    userGrowth: UserGrowthPoint[]
    categoryDistribution: DistributionPoint[]
    activityData: ActivityDataPoint[]
    applicationStatusDistribution: DistributionPoint[]
    jobStatusDistribution: DistributionPoint[]
  }
}
