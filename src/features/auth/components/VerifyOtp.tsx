import CsButton from '@/components/ui/cs-button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/shadcn/input-otp'
import { useResendRegisterOtpMutation } from '@/queries/auth/useAuth';
import { useResendResetPasswordOtpMutation } from '@/queries/auth/usePassword';
import { useEffect, useState } from 'react'

interface OtpVerifyProps {
  email: string;
  purpose: "register" | "reset-password";
  mutateFn: (data: { email: string; otp: string }) => void;
  isPending: boolean;
}


export default function VerifyOtp({ email, purpose, mutateFn, isPending, }: OtpVerifyProps)  {

  const {mutate:resendRegisterOtp}=useResendRegisterOtpMutation()
  const {mutate:resendResetPasswordOtp}=useResendResetPasswordOtpMutation()

  const [timer, setTimer] = useState(59);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);
 const handleResendOtp = () => {
  if(purpose=="register"){
    resendRegisterOtp(email)
  }else{
    resendResetPasswordOtp(email)
  }
    setTimer(59); 
  };

  const handleSubmit = () => {
    mutateFn({ email, otp });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-6 rounded-xl bg-white p-6 shadow-md">
        <h2 className="text-center text-2xl font-bold">Verify OTP TO {purpose}</h2>

        <p className="text-center text-sm text-gray-600">
          OTP sent to <span className="font-medium">{email}</span>
        </p>

        {/* SHADCN OTP */}
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
<div className="text-center">
      <button
        onClick={handleResendOtp}
        disabled={timer > 0}
        className={`
          ${timer > 0 ? " cursor-not-allowed text-gray-600" : "cursor-pointer"}
        `}
      >
        Resend OTP <b>{timer}s</b>
      </button>
    </div>
        <CsButton
          className="w-full"
          onClick={handleSubmit}
          disabled={otp.length !== 6 || isPending}
        >
          {isPending ? "Verifying..." : "Verify OTP"}
        </CsButton>
      </div>
    </div>
  )
}

