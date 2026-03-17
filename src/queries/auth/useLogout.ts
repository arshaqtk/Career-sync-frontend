// useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogoutApi } from "@/api/auth.api";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: LogoutApi,
    onSuccess: () => {
      queryClient.clear();
      navigate("/auth/login");
      toast.success("Logged out successfully");
    }
  });
}
