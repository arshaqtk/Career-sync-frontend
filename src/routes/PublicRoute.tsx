import useUserData from "@/hooks/useUserData";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

export default function PublicRoute() {
    const { data: user, isLoading } = useUserData()

    if (isLoading) return <p>Loading...</p>;
   if (user) {
  toast.warning("You are already logged in");
  return (
    <Navigate
      to={user.role === "candidate" ? "/" : "/recruiter"}
      replace
    />
  );
}
    return <Outlet />;
}