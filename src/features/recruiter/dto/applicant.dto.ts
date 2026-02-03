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
    _id?:string,
    name: string,
    email: string,
    phone: string,
    profilePicture:{url:string},
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