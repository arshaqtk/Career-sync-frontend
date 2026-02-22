import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/shadcn/input-otp"
import { useResendRegisterOtpMutation } from "@/hooks/useAuth"
import { useResendResetPasswordOtpMutation } from "@/hooks/usePassword"
import { useEffect, useState } from "react"
import { Mail, ShieldCheck, RotateCcw, ArrowRight, Loader2 } from "lucide-react"

interface OtpVerifyProps {
  email: string
  purpose: "register" | "reset-password"
  mutateFn: (data: { email: string; otp: string }) => void
  isPending: boolean
}

export default function VerifyOtp({
  email,
  purpose,
  mutateFn,
  isPending,
}: OtpVerifyProps) {
  const { mutate: resendRegisterOtp } = useResendRegisterOtpMutation()
  const { mutate: resendResetPasswordOtp } = useResendResetPasswordOtpMutation()

  const [timer, setTimer] = useState(59)
  const [otp, setOtp] = useState("")

  useEffect(() => {
    if (timer === 0) return
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [timer])

  const handleResendOtp = () => {
    if (purpose === "register") {
      resendRegisterOtp(email)
    } else {
      resendResetPasswordOtp(email)
    }
    setTimer(59)
  }

  const handleSubmit = () => {
    mutateFn({ email, otp })
  }

  const isRegister = purpose === "register"
  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(?=@)/, (_, a, b) => a + "*".repeat(b.length))
    : ""

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 px-4">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl shadow-blue-100/40 p-8">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-200">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {isRegister ? "Verify Your Email" : "Reset Password"}
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed">
              {isRegister
                ? "We've sent a 6-digit verification code to"
                : "Enter the 6-digit code sent to your email"}
            </p>
            {email && (
              <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full">
                <Mail className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">{maskedEmail}</span>
              </div>
            )}
          </div>

          {/* OTP Input */}
          <div className="flex justify-center mb-6">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="w-11 h-12 text-lg font-bold border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {/* Progress bar for OTP slots */}
          <div className="flex gap-1 justify-center mb-6">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1 w-8 rounded-full transition-all duration-300 ${i < otp.length ? "bg-blue-500" : "bg-slate-100"
                  }`}
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={otp.length !== 6 || isPending}
            className="w-full flex items-center justify-center gap-2 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 text-white font-semibold rounded-xl transition-all duration-200 shadow-md shadow-blue-200 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                {isRegister ? "Verify & Continue" : "Confirm OTP"}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Resend Section */}
          <div className="mt-6 text-center">
            {timer > 0 ? (
              <p className="text-sm text-slate-500">
                Resend code in{" "}
                <span className="font-semibold text-blue-600 tabular-nums">
                  0:{String(timer).padStart(2, "0")}
                </span>
              </p>
            ) : (
              <button
                onClick={handleResendOtp}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Resend OTP
              </button>
            )}
          </div>

          {/* Timer ring */}
          {timer > 0 && (
            <div className="flex justify-center mt-3">
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16" cy="16" r="12"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="3"
                />
                <circle
                  cx="16" cy="16" r="12"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${75.4}`}
                  strokeDashoffset={`${75.4 - (75.4 * timer) / 59}`}
                  className="transition-all duration-1000"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Bottom hint */}
        <p className="text-center text-xs text-slate-400 mt-4">
          Didn't receive it? Check your spam folder.
        </p>
      </div>
    </div>
  )
}
