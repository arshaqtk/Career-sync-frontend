import { Outlet } from "react-router-dom"
import { useState } from "react"
import { motion } from "framer-motion"

import {AdminSidebar} from "../components/navigation/AdminSidebar"
import {AdminTopNavbar} from "../components/navigation/AdminTopNavbar"

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false)

  const sidebarVariants = {
    open: { width: 256 },
    closed: { width: 80 },
  }

  const contentVariants = {
    open: { marginLeft: 256 },
    closed: { marginLeft: 80 },
  }

  const sidebarTransition = {
    stiffness: 300,
    damping: 30,
    mass: 1,
  };

  return (
    <div className="dark min-h-screen flex bg-background text-foreground transition-colors duration-300">
      {/* Sidebar with Hover Event */}
      <motion.aside
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        transition={sidebarTransition}
        className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex overflow-hidden z-50 border-r border-border/50"
      >
        <AdminSidebar isOpen={isOpen} />
      </motion.aside>

      {/* Main Content & Header */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={contentVariants}
        transition={sidebarTransition}
        className="flex flex-col flex-1 min-h-screen"
      >
        {/* Top Navbar */}
        <motion.header
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={{
              open: { left: 256 },
              closed: { left: 80 }
          }}
          transition={sidebarTransition}
          className="fixed top-0 right-0 z-40 h-16 bg-background/80 backdrop-blur-md border-b"
        >
          <AdminTopNavbar />
        </motion.header>

        {/* Page Content */}
        <main className="pt-20 px-6">
          <Outlet />
        </main>
      </motion.div>
    </div>
  )
}
