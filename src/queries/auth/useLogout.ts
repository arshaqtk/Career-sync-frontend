// useLogout.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogoutApi } from "@/api/auth.api";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: LogoutApi,
    onSuccess: () => {
      queryClient.clear();
      navigate("/login");
      alert("Logouted")
    },
    onError: (err) => {
      console.error("Logout failed:", err);
      alert("Logout Failed.");
    }
  });
}
