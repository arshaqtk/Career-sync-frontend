import { SectionSkeleton } from "@/components/Loaders";
import useUserData from "@/hooks/useUserData";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
    const { data: user, isLoading } = useUserData()

    if (isLoading) return <SectionSkeleton/>
   if (user) {
    const roleRoutes = {
      candidate: "/home",
      recruiter: "/recruiter",
      admin: "/admin",
    };
    return <Navigate to={roleRoutes[user.role as keyof typeof roleRoutes] || "/"} replace />;
  
}
    return <Outlet />;
}