import type { SidebarIconName } from "./iconMap";

export interface SidebarItem {
  label: string;
  icon: SidebarIconName;
  path: string;
  ownerOnly?: boolean;
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
  {
    label: "Messages",
    icon: "MessageSquare",
    path: "/recruiter/chat",
  },
  {
    label: "Team",
    icon: "ShieldCheck",
    path: "/recruiter/manage-recruiters",
    ownerOnly: true,
  },
];
