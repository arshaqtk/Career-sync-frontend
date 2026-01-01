export interface RecruiterDashboardStats {
  activeJobs: number
  newApplications: number
  interviewsToday: number
  hiredCandidates: number
}

export interface DashboardActionItem {
  label: string
  count: number
  action: "review" | "schedule" | "feedback"
}

export interface RecentApplication {
  id: string
  candidateName: string
  jobTitle: string
  experience:string
  status:"Applied" | "Shortlisted" | "Rejected"
}

export interface TodaysInterview {
  id: string
  candidateName: string
  role: string
  time: string
  round:string
}

export interface HiringFunnel {
  applied: number
  shortlisted: number
  interviewed: number
  selected: number
  hired: number
}

export interface RecruiterDashboardResponse {
  stats: RecruiterDashboardStats
  actions: DashboardActionItem[]
  recentApplications: RecentApplication[]
  todaysInterviews: TodaysInterview[]
  funnel: HiringFunnel
}
