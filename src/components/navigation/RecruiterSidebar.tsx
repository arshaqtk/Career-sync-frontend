import { NavLink } from "react-router-dom";
import { recruiterSidebar } from "@/config/recruiterSidebar.config";
import { iconMap } from "@/config/iconMap";

export  function RecruiterSidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen bg-white border-r transition-all
        ${isOpen ? "w-64" : "w-20"}
      `}
    >
      <div className="p-6 text-xl font-bold">CSync</div>

      <nav className="px-3 space-y-3">
        {recruiterSidebar.map(item => {
          const Icon = iconMap[item.icon];
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 
                 ${isActive ? "bg-gray-100 font-semibold" : ""}`
              }
            >
              <Icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
