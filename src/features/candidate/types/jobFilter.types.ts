export type JobFilters = {
  status?: "all"|"open" | "closed" | "draft";
  jobType?: "all"|"full-time" | "part-time" | "internship";
  search?:string;
 field?: string
  location?: string
  remote?: boolean
  experienceMin?: number
  experienceMax?: number
};