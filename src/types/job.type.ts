export interface Job {
  _id?:string
  title: string;
  company: string;
  description?: string;
  skills?: string[];
  experienceMin?: number;
  experienceMax?: number;
  salary?: string
  location?: string;
  remote: boolean;
  jobType: "full-time" | "part-time" | "internship";
  status: "open" | "closed" | "paused";
  applicationCount?: number;
  createdAt?: Date;
}