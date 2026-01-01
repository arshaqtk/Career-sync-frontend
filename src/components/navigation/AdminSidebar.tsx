import { NavLink } from "react-router-dom"
import { Users, Briefcase, BarChart } from "lucide-react"

const navItems = [
  { label: "Dashboard", icon: BarChart, to: "/admin" },
  { label: "Recruiters", icon: Users, to: "/admin/recruiters" },
  { label: "Candidates", icon: Users, to: "/admin/candidates" },
  { label: "Jobs", icon: Briefcase, to: "/admin/jobs" },
  // { label: "System Logs", icon: Shield, to: "/admin/logs" },
]

export default function AdminSidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="h-full w-full bg-background border-r px-3 py-6">
      <div className="mb-8 text-center font-bold">
        {isOpen ? "Admin Panel" : "A"}
      </div>

      <nav className="space-y-2">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition
              ${isActive ? "bg-muted font-medium" : "hover:bg-muted"}`
            }
          >
            <Icon className="h-4 w-4" />
            {isOpen && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
