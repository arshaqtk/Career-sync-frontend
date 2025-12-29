export type RecruiterList = {
  id: string
  name: string
  email: string
  company: string
  jobsPosted: number
  status: "active" | "blocked"
}