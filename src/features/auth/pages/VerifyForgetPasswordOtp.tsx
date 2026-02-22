import { useSendResetPasswordEmail, useVerifyResetPasswordOtp } from "@/hooks/usePassword";
import { useState } from "react";
import VerifyOtp from "../components/VerifyOtp";
import { Input } from "@/components/ui/shadcn/input";
import { Mail, Loader2, ArrowRight, Lock } from "lucide-react";
import { toast } from "sonner";

export default function VerifyForgetPasswordOtp() {
  const [email, setEmail] = useState("");

  const { mutate: verifyOtp, isPending: isOtpVerifying } = useVerifyResetPasswordOtp();
  const {
    mutate: sendOtp,
    isPending: isSendingOtp,
    isSuccess: isSendSuccess,
  } = useSendResetPasswordEmail();

  const handleEmailSubmit = () => {
    if (!email) {
      toast.warning("Please enter your email");
      return;
    }
    sendOtp(email);
  };

  // Once OTP is sent → show OTP verification screen
  if (isSendSuccess) {
    return (
      <VerifyOtp
        email={email}
        purpose="reset-password"
        mutateFn={verifyOtp}
        isPending={isOtpVerifying}
      />
    );
  }

  // Email entry screen
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 px-4">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl shadow-blue-100/40 p-8">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Forgot Password?</h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              No worries! Enter your registered email and we'll send you a verification code.
            </p>
          </div>

          {/* Email Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="forgot-password-email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-12 border-slate-200 bg-slate-50 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
                />
              </div>
            </div>

            <button
              onClick={handleEmailSubmit}
              disabled={isSendingOtp}
              className="w-full flex items-center justify-center gap-2 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-md shadow-blue-200 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
            >
              {isSendingOtp ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                <>
                  Send Verification Code
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Divider note */}
          <p className="text-center text-xs text-slate-400 mt-6">
            Remember your password?{" "}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Back to Login
            </a>
          </p>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          Check your spam folder if you don't receive it within a minute.
        </p>
      </div>
    </div>
  );
}
