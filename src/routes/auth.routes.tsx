import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import ResetPassword from "@/features/auth/pages/ResetPassword";
import VerifyForgetPasswordOtp from "@/features/auth/pages/VerifyForgetPasswordOtp";
import { VerifyRegisterOtp } from "@/features/auth/pages/VerifyRegisterOtp";

export const authRoutes = [
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "verify-otp", element: <VerifyRegisterOtp /> },
  { path: "forget-password", element: <VerifyForgetPasswordOtp /> },
  { path: "reset-password", element: <ResetPassword /> },
];
