export type RecruiterList = {
  id: string
  name: string
  email: string
  company: string
  jobsPosted: number
  status: "active" | "blocked"
}

export interface RecruiterCompany {
  companyName: string
  companyWebsite?: string
  companyLocation?: string
  companyDescription?: string
}
