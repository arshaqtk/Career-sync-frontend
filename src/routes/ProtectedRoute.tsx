import { Navigate, Outlet } from "react-router-dom";
import useUserData from "@/hooks/useUserData";

export default function ProtectedRoute({ role }: { role: "candidate" | "recruiter" }) {
  const { data: user, isLoading } = useUserData();

  if (isLoading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/auth/login" replace />;

  if (user.role !== role)
    return <Navigate to={user.role === "candidate" ? "/" : "/recruiter"} replace />;

  return <Outlet />;
}
