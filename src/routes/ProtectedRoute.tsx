import { Navigate, Outlet } from "react-router-dom";
import useUserData from "@/hooks/useUserData";
import { toast } from "sonner";
import { SectionSkeleton } from "@/components/Loaders";

export default function ProtectedRoute({ role }: { role: "candidate" | "recruiter"|"admin" }) {
  const { data: user, isLoading } = useUserData();

  if (isLoading) return <SectionSkeleton/>

  if (!user) {
    toast.warning("You are not logged in");
    return <Navigate to="/auth/login" replace />;}

  if (user.role !== role){
    const roleRoutes = {
      candidate: "/home",
      recruiter: "/recruiter",
      admin: "/admin",
    };
    return <Navigate to={roleRoutes[user.role as keyof typeof roleRoutes] || "/"} replace />;
  }
  return <Outlet />;
}
