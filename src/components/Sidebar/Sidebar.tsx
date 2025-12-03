import { Home, Briefcase, FileText, Calendar, MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-screen px-4 py-6">
      <h1 className="text-xl font-semibold mb-8">CareerSync</h1>

      <nav className="space-y-3">
        <NavLink to="/" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
          <Home size={20} />
          Dashboard
        </NavLink>

        <NavLink to="/jobs" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
          <Briefcase size={20} />
          Browse Jobs
        </NavLink>

        <NavLink to="/applications" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
          <FileText size={20} />
          My Applications
        </NavLink>

        <NavLink to="/interviews" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
          <Calendar size={20} />
          Interviews
        </NavLink>

        <NavLink to="/messages" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100">
          <MessageSquare size={20} />
          Messages
        </NavLink>
      </nav>
    </aside>
  );
}
