import { Navigate, Outlet } from "react-router-dom";
import useUserData from "@/hooks/useUserData";
import { toast } from "sonner";

export default function ProtectedRoute({ role }: { role: "candidate" | "recruiter"|"admin" }) {
  const { data: user, isLoading } = useUserData();

  if (isLoading) return <p>Loading...</p>;

  if (!user) {
    toast.warning("You are not logged in");
    return <Navigate to="/auth/login" replace />;}

  if (user.role !== role)
    return <Navigate to={user.role === "candidate" ? "/" : "/recruiter"} replace />;

  return <Outlet />;
}
