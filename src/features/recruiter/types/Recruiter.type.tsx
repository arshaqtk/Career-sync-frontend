export interface RecruiterProfile {
  id: string
  name: string
  email: string
  field:string
  role: string
   recruiterData?: {
    companyName?: string
    companyWebsite?: string
    size?: string
    companyDescription?: string
    companyLocation?:string
  }
  profilePictureUrl?: string
  status: "ACTIVE" | "INACTIVE"
}

// types/recruiter-profile.type.ts
export interface RecruiterProfileDetails {
  email: string
  phone?: string
  role: string
  location?: string

  recruiterData: {
    companyName: string
    companyWebsite?: string
    size?: string
    companyDescription?: string
    companyLocation?:string
  }
}


export interface RecruiterCompany {
  companyName: string
  companyWebsite?: string
  companyLocation?: string
  companyDescription?: string
}

export interface UpdateRecruiterCompanyPayload {
  companyName: string
  companyWebsite?: string
  companyLocation?: string
  companyDescription?: string
}