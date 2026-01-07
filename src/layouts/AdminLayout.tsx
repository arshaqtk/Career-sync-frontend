import { Outlet } from "react-router-dom"
import { useState } from "react"

import {AdminSidebar} from "../components/navigation/AdminSidebar"
import {AdminTopNavbar} from "../components/navigation/AdminTopNavbar"
import {SidebarToggle} from "../components/navigation/SidebarToggle"

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="min-h-screen flex bg-muted/40">
      {/* Sidebar */}
      <aside
        className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex
        ${isOpen ? "lg:w-64" : "lg:w-20"}
        transition-all duration-300`}
      >
        <AdminSidebar isOpen={isOpen} />
      </aside>

      {/* Sidebar Toggle */}
      <SidebarToggle
        isOpen={isOpen}
        toggle={() => setIsOpen((prev) => !prev)}
      />

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300
        ${isOpen ? "lg:ml-64" : "lg:ml-20"}`}
      >
        {/* Top Navbar */}
        <header
          className={`fixed top-0 right-0 z-40 h-16 bg-background border-b
          ${isOpen ? "lg:left-64" : "lg:left-20"}
          transition-all duration-300`}
        >
          <AdminTopNavbar />
        </header>

        {/* Page Content */}
        <main className="pt-20 px-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
