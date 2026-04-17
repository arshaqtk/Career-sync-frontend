import { NavLink } from "react-router-dom"
import { Users, Briefcase, BarChart, Building2 } from "lucide-react"
import CareerSyncLogo from "@/shared/logo/careerSync.logo"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Dashboard", icon: BarChart, to: "/admin" },
  { label: "Recruiters", icon: Users, to: "/admin/recruiters" },
  { label: "Candidates", icon: Users, to: "/admin/candidates" },
  { label: "Jobs", icon: Briefcase, to: "/admin/jobs" },
  { label: "Companies", icon: Building2, to: "/admin/companies" },
  // { label: "System Logs", icon: Shield, to: "/admin/logs" },
]

import { motion, AnimatePresence } from "framer-motion"

const springConfig = { stiffness: 300, damping: 30 }

export function AdminSidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="h-full w-full bg-background/50 backdrop-blur-xl border-r border-border/50 px-3 py-6 relative overflow-hidden">
      <div className={cn("mb-10 px-4 flex items-center")}>
        <CareerSyncLogo showText={isOpen} className="h-9" />
      </div>

      <nav className="space-y-2">
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-300 group relative",
                isActive 
                  ? "bg-primary/10 text-primary font-bold shadow-sm shadow-primary/5" 
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )
            }
          >
            <motion.div layout transition={springConfig} className="shrink-0 z-10">
                <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            </motion.div>
            
            <AnimatePresence mode="popLayout">
                {isOpen && (
                    <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5, transition: { duration: 0.1 } }}
                        transition={{ ...springConfig, delay: 0.05 }}
                        className="whitespace-nowrap font-medium"
                    >
                        {label}
                    </motion.span>
                )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
