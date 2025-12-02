import { useSendResetPasswordEmail, useVerifyResetPasswordOtp } from '@/queries/auth/usePassword';
import React, { useState } from 'react'
import VerifyOtp from '../components/VerifyOtp';
import CSInput from '@/components/ui/cs-input';
import { Mail } from 'lucide-react';

export default function VerifyForgetPasswordOtp() {
    const [email,setEmail]=useState("")
     const { mutate: verifyOtp, isPending } = useVerifyResetPasswordOtp();
const { mutate: sendOtp,  isSuccess: isSendSuccess, } = useSendResetPasswordEmail();

     const handleEmailSubmit = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }
    sendOtp(email)
  };
  return (
   <div>
      {!isSendSuccess && (
        <div className='space-y-4'>
             <CSInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        icon={<Mail className="w-5 h-5" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
       <button
          onClick={handleEmailSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Send OTP
        </button>
        </div>
       
      )}

      {isSendSuccess && (
        <VerifyOtp
          email={email}
          purpose="reset-password"
          mutateFn={verifyOtp}
          isPending={isPending}
        />
      )}

    </div>
  )
}

