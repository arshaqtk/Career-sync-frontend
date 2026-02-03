import { NavLink } from "react-router-dom";
import { recruiterSidebar } from "@/config/recruiterSidebar.config";
import { iconMap } from "@/config/iconMap";
import { cn } from "@/lib/utils";

interface RecruiterSidebarProps {
  isOpen: boolean;
  isMobile?: boolean;
  onNavItemClick?: () => void;
}

export function RecruiterSidebar({ isOpen, isMobile, onNavItemClick }: RecruiterSidebarProps) {
  return (
    <aside
      className={cn(
        "h-screen bg-white transition-all duration-300 ease-in-out flex flex-col",
        !isMobile && "fixed top-0 left-0 border-r",
        isOpen ? "w-64" : "w-20",
        isMobile && "w-full border-none"
      )}
    >
      {!isMobile && (
        <div className={cn(
          "h-20 flex items-center px-6 border-b transition-all duration-300",
          !isOpen && "justify-center px-0"
        )}>
          <span className={cn(
            "text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent truncate",
            !isOpen && "hidden"
          )}>
            CSync
          </span>
          {!isOpen && <span className="text-2xl font-bold text-primary">C</span>}
        </div>
      )}

      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto overflow-x-hidden">
        {recruiterSidebar.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/recruiter"}
              onClick={onNavItemClick}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold shadow-sm"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900",
                  !isOpen && !isMobile && "justify-center p-3"
                )
              }
            >
              <Icon size={22} className={cn(
                "transition-transform duration-200 group-hover:scale-110 shrink-0",
                "group-[.active]:text-primary"
              )} />

              {(isOpen || isMobile) && (
                <span className="truncate text-sm">{item.label}</span>
              )}

              {!isOpen && !isMobile && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className={cn(
          "bg-gray-50 rounded-xl p-3 flex items-center gap-3",
          !isOpen && !isMobile && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <span className="text-xs font-bold font-mono">REC</span>
          </div>
          {(isOpen || isMobile) && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-gray-900">Recruiter Mode</span>
              <span className="text-[10px] text-gray-500">Professional Access</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
