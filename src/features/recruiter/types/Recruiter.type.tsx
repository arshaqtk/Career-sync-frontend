export interface RecruiterProfile {
  id: string
  name: string
  email: string
  role: string
  companyName: string
  profilePictureUrl?: string
  status: "ACTIVE" | "INACTIVE"
}

// types/recruiter-profile.type.ts
export interface RecruiterProfileDetails {
  email: string
  phone?: string
  role: string
  location?: string

  company: {
    name: string
    website?: string
    size?: string
    description?: string
  }
}
