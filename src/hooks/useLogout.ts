import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth.store";

export default function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async() => {
    
    queryClient.clear();

    logout();
    navigate("/auth/login");
  };

  return handleLogout;
}
