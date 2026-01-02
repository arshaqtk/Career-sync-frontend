"use client";

import { useSendResetPasswordEmail, useVerifyResetPasswordOtp } from "@/queries/auth/usePassword";
import  { useState } from "react";
import VerifyOtp from "../components/VerifyOtp";

import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/shadcn/card";

import { Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function VerifyForgetPasswordOtp() {
  const [email, setEmail] = useState("");

  const { mutate: verifyOtp, isPending: isOtpVerifying } = useVerifyResetPasswordOtp();
  const { mutate: sendOtp, isPending: isSendingOtp, isSuccess: isSendSuccess } =
    useSendResetPasswordEmail();

  const handleEmailSubmit = () => {
    if (!email) {
      toast.warning("Please enter your email");
      return;
    }
    sendOtp(email);
  };

  // ----------------------------
  // If OTP is sent → show ONLY the OTP Card component
  // ----------------------------
  if (isSendSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
        <VerifyOtp
          email={email}
          purpose="reset-password"
          mutateFn={verifyOtp}
          isPending={isOtpVerifying}
        />
      </div>
    );
  }

  // ----------------------------
  // Otherwise → show the Email Card
  // ----------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-lg border animate-in fade-in">
        <CardHeader>
          <CardTitle className="text-center text-xl">
            Forgot Password - Verify OTP
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <Button
              onClick={handleEmailSubmit}
              className="w-full"
              disabled={isSendingOtp}
            >
              {isSendingOtp ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send OTP"
              )}
            </Button>
          </div>
        </CardContent>

        <CardFooter className="text-center text-sm text-muted-foreground">
          Enter your registered email to receive OTP
        </CardFooter>
      </Card>
    </div>
  );
}
