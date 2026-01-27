import { SectionSkeleton } from "@/components/Loaders";
import useUserData from "@/hooks/useUserData";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

export default function PublicRoute() {
    const { data: user, isLoading } = useUserData()

    if (isLoading) return <SectionSkeleton/>
   if (user) {
  toast.warning("You are already logged in");
  return (
    <Navigate
      to={user.role === "candidate" ? "/home" : "/recruiter"}
      replace
    />
  );
}
    return <Outlet />;
}