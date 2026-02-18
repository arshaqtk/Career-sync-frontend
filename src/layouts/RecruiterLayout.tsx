// import { Outlet } from "react-router-dom";
// import { RecruiterSidebar } from "../components/navigation/RecruiterSidebar";
// import { RecruiterTopNavbar } from "../components/navigation/RecruiterTopNavbar";
// import { SidebarToggle } from "../components/navigation/SidebarToggle";
// import { useState } from "react";
// import { useNotificationSocket } from "@/hooks/useNotificationSocket";
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/shadcn/sheet";

// export default function RecruiterLayout() {
//   useNotificationSocket();
//   const [open, setOpen] = useState(true);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="min-h-screen flex bg-gray-50/50">
//       {/* Desktop Sidebar */}
//       <div className="hidden lg:block">
//         <RecruiterSidebar isOpen={open} />
//         <SidebarToggle isOpen={open} toggle={() => setOpen(!open)} />
//       </div>

//       {/* Mobile Sidebar */}
//       <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
//         <SheetContent side="left" className="p-0 w-72">
//           <SheetHeader className="p-6 border-b">
//             <SheetTitle className="text-2xl font-bold text-primary">CareerSync</SheetTitle>
//           </SheetHeader>
//           <div className="mt-4">
//             <RecruiterSidebar isOpen={true} isMobile onNavItemClick={() => setMobileOpen(false)} />
//           </div>
//         </SheetContent>
//       </Sheet>

//       {/* Main Content Area */}
//       <div className={`flex-1 flex flex-col transition-all duration-300 ${open ? "lg:ml-64" : "lg:ml-20"}`}>
//         <div className={`fixed top-0 right-0 h-20 bg-white/80 backdrop-blur-md z-40 border-b transition-all duration-300 
//           ${open ? "lg:left-64" : "lg:left-20"} left-0`}>
//           <RecruiterTopNavbar onMenuClick={() => setMobileOpen(true)} />
//         </div>

//         <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RecruiterSidebar } from "../components/navigation/RecruiterSidebar";
import { RecruiterTopNavbar } from "../components/navigation/RecruiterTopNavbar";
import { SidebarToggle } from "../components/navigation/SidebarToggle";
import { useState, useEffect } from "react";
import { useNotificationSocket } from "@/hooks/useNotificationSocket";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/shadcn/sheet";
import useUserData from "@/hooks/useUserData";
import { SectionSkeleton } from "@/components/Loaders";

export default function RecruiterLayout() {
  useNotificationSocket();
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: user, isLoading } = useUserData();
  const location = useLocation();
  const navigate = useNavigate();

  const hasCompany = !!user?.recruiterData?.company;
  const isOnboarding = location.pathname === "/recruiter/onboarding";

  useEffect(() => {
    if (!isLoading && user?.role === "recruiter") {
      if (!hasCompany && !isOnboarding) {
        navigate("/recruiter/onboarding");
      } else if (hasCompany && isOnboarding) {
        navigate("/recruiter");
      }
    }
  }, [user, isLoading, hasCompany, isOnboarding, navigate]);

  if (isLoading) {
    return <SectionSkeleton />;
  }

  // If user needs onboarding, show simplified layout (just the outlet)
  // We check !hasCompany OR isOnboarding to handle the transition smoothly
  if (!hasCompany || isOnboarding) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50/50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <RecruiterSidebar isOpen={open} />
        <SidebarToggle isOpen={open} toggle={() => setOpen(!open)} />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-72">
          <SheetHeader className="p-6 border-b">
            <SheetTitle className="text-2xl font-bold text-primary">CareerSync</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <RecruiterSidebar isOpen={true} isMobile onNavItemClick={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${open ? "lg:ml-64" : "lg:ml-20"}`}>
        <div className={`fixed top-0 right-0 h-20 bg-white/80 backdrop-blur-md z-40 border-b transition-all duration-300 
          ${open ? "lg:left-64" : "lg:left-20"} left-0`}>
          <RecruiterTopNavbar onMenuClick={() => setMobileOpen(true)} />
        </div>

        <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
