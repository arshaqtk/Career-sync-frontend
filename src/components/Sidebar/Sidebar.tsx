import { sidebarConfig } from "@/config/uiLayout.config";
import { iconMap } from "@/config/iconMap";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  role: "candidate" | "recruiter";
}

export default function Sidebar({ role }: SidebarProps) {
  console.log(role)
  const items = sidebarConfig[role];
console.log(items)
  return (
    <aside className="w-64 bg-white border-r h-screen px-4 py-6">
      <h1 className="text-xl font-semibold mb-8">CareerSync</h1>

      <nav className="space-y-3">
        {items.map(item => {
          const Icon = iconMap[item.icon]; 
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
            >
              <Icon size={20} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
