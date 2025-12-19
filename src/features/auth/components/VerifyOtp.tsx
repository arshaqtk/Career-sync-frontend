import { Button } from "@/components/ui/shadcn/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/shadcn/input-otp"
import { useResendRegisterOtpMutation } from "@/queries/auth/useAuth"
import { useResendResetPasswordOtpMutation } from "@/queries/auth/usePassword"
import { useEffect, useState } from "react"

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
  const { mutate: resendResetPasswordOtp } =
    useResendResetPasswordOtpMutation()

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

 return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm space-y-6 rounded-xl border bg-background p-6 shadow-sm">
        
        {/* HEADER */}
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-semibold">
            Verify OTP
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter the code sent to{" "}
            <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>

        {/* OTP INPUT */}
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* RESEND */}
        <div className="flex justify-center">
          <Button
            variant="link"
            size="sm"
            disabled={timer > 0}
            onClick={handleResendOtp}
          >
            Resend OTP
            {timer > 0 && (
              <span className="ml-1 text-muted-foreground">
                ({timer}s)
              </span>
            )}
          </Button>
        </div>

        {/* SUBMIT */}
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={otp.length !== 6 || isPending}
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </Button>
      </div>
    </div>
  )
}
