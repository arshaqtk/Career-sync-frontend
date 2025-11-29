export type LoginRole = "candidate" | "recruiter" | "admin";
export type RegisterRole = "candidate" | "recruiter";


export const LOGINROLES: { id: LoginRole; label: string }[] = [
  { id: "candidate", label: "Candidate" },
  { id: "recruiter", label: "Recruiter" },
  { id: "admin", label: "Admin" },
];
export const REGISTEROLES: { id: RegisterRole; label: string }[] = [
  { id: "candidate", label: "Candidate" },
  { id: "recruiter", label: "Recruiter" },
];