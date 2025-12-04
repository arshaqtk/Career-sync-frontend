import  CsButton  from '@/components/ui/cs-button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/shadcn/input-otp'
import React, { useState } from 'react'

interface OtpVerifyProps {
  email: string;
  purpose: "register" | "reset-password";
  mutateFn: (data: { email: string; otp: string }) => void;
  isPending: boolean;
}


export default function VerifyOtp ({email,
  purpose,
  mutateFn,
  isPending,}:OtpVerifyProps) {

    const [otp, setOtp] = useState("");

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

