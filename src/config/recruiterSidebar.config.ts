import type { SidebarIconName } from "./iconMap";

export interface SidebarItem {
  label: string;
  icon: SidebarIconName;
  path: string;
}

export const recruiterSidebar: SidebarItem[] = [
  {
    label: "Dashboard",
    icon: "LayoutDashboard",
    path: "/recruiter",
  },
  {
    label: "Jobs",
    icon: "Briefcase",
    path: "/recruiter/jobs",
  },
  {
    label: "Applicants",
    icon: "Users",
    path: "/recruiter/applicants",
  },
  {
    label: "Interviews",
    icon: "Calendar",
    path: "/recruiter/interviews",
  },
  // {
  //   label: "Analytics",
  //   icon: "BarChart3",
  //   path: "/recruiter/analytics",
  // },
];
