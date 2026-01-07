export type JobFilters = {
  status: "all"|"open" | "closed" | "draft";
  jobType: "all"|"full-time" | "part-time" | "internship";
  location?: string;
  experience?: string;
  search?: string;
  sortByApplication?: "most_applied" | "least_applied";
};