import type { SidebarIconName } from "./iconMap";

export interface SidebarItem {
  label: string;
  icon: SidebarIconName;
  path: string;
}

export const sidebarConfig = {
  recruiter: [
    { label: "Dashboard", icon: "LayoutDashboard", path: "/recruiter/dashboard" },
    { label: "Jobs", icon: "Briefcase", path: "/recruiter/jobs" },
    { label: "Candidates", icon: "Users", path: "/recruiter/candidates" },
    { label: "Interviews", icon: "Calendar", path: "/recruiter/interviews" },
    { label: "Analytics", icon: "BarChart3", path: "/recruiter/analytics" }
  ],
  candidate: [
    { label: "Dashboard", icon: "Home", path: "/dashboard" },
    { label: "Jobs", icon: "Search", path: "/jobs" },
    { label: "Applications", icon: "FileText", path: "/applications" },
    { label: "Profile", icon: "User", path: "/profile" }
  ]
} satisfies Record<string, SidebarItem[]>;
