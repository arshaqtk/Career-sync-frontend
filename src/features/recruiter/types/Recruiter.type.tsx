export interface RecruiterProfile {
  id: string
  name: string
  email: string
  field:string
  role: string
   recruiterData?: {
    company?: {
      _id: string;
      name: string;
      logo?: { url: string };
      website?: string;
      location?: string;
      industry?: string;
      size?: string;
      description?: string;
    }
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
    company?: {
      _id: string;
      name: string;
      logo?: { url: string };
      website?: string;
      location?: string;
      industry?: string;
      size?: string;
      description?: string;
    }
  }
}


export interface RecruiterCompany {
 _id: string
  name: string
  website?: string
  location?: string
  description?: string
  logo?: { url: string }
  industry?: string
  size?: string
  foundedYear?: number
}

export interface UpdateRecruiterCompanyPayload {
  companyId: string
  updates: Partial<RecruiterCompany>
}