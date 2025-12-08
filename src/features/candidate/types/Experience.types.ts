export interface Experience {
  _id?: string;
  company: string;
  role: string;
  startDate: Date; 
  endDate?: Date; 
  location?: string;
  description?: string;
  logoUrl?:string,
 jobType?:"full-time"|"part-time"|"internship";
  skills?: string[];
}

export type ExperienceFormValues=Experience