export interface ApplicantDTO{
    
  status: string,
  resumeUrl: string,
  coverLetter: string,
  experience: string,
  currentRole: string,
  expectedSalary: number,
  noticePeriod: string,
  createdAt: string,

  candidateId: {
    name: string,
    email: string,
    phone: string,
    profileImage: string,
    location: string,
    experience: number
  },

  jobId: {
    title: string,
    company: string,
    location: string,
    jobType: string,
    salary: string
  }
}