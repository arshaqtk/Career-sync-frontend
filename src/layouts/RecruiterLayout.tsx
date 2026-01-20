import { Outlet } from "react-router-dom";
import {RecruiterSidebar} from "../components/navigation/RecruiterSidebar";
import {RecruiterTopNavbar} from "../components/navigation/RecruiterTopNavbar";
import {SidebarToggle} from "../components/navigation/SidebarToggle";
import { useState } from "react";
import { useNotificationSocket } from "@/hooks/useNotificationSocket";

export default function RecruiterLayout() {
  useNotificationSocket();
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-50">

      <div className="hidden lg:block">
        <RecruiterSidebar isOpen={open} />
        <SidebarToggle isOpen={open} toggle={() => setOpen(!open)} />
      </div>

      <div className={`flex-1 transition-all ${open ? "lg:ml-64" : "lg:ml-20"}`}> 
        <div className="fixed top-0 left-0 right-0 bg-white border-b z-40 lg:left-64">
          <RecruiterTopNavbar />
        </div>

        <main className="pt-24 px-6 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
