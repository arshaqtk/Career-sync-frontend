import { ResendResetPasswordOtp, ResetPasswordApi, SendResetPasswordEmail, VerifyResetPasswordOtpApi } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSendResetPasswordEmail = () => {
    const mutate = useMutation({
        mutationFn: SendResetPasswordEmail,
        onSuccess() {
            toast.success("Otp Sented Successfully")
        },
        onError(error: unknown) {
            type ErrorWithResponse = {
                response?: {
                    data?: {
                        message?: string;
                    };
                };
            };

            if (
                typeof error === "object" &&
                error !== null &&
                "response" in error &&
                typeof (error as ErrorWithResponse).response === "object"
            ) {
                const err = error as ErrorWithResponse;
                toast.error(err.response?.data?.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    })

    return mutate

}
export const useResendResetPasswordOtpMutation = () => {
    const mutation = useMutation({
        mutationFn: ResendResetPasswordOtp,
        onSuccess: () => {
            toast.success("OTP resent successfully");
        },
        onError: () => {
            toast.error("Something went wrong");
        }
    })
    return mutation
}
export const useVerifyResetPasswordOtp = () => {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: VerifyResetPasswordOtpApi,
        onSuccess(data: { email: string, resetToken: string, message: string }) {
            toast.success(data.message)
            navigate("/auth/reset-password", {
                state: {
                    email: data.email,
                    resetToken: data.resetToken,
                },
            });
        },
        onError(error: unknown) {
            type ErrorWithResponse = {
                response?: {
                    data?: {
                        message?: string;
                    };
                };
            };

            if (
                typeof error === "object" &&
                error !== null &&
                "response" in error &&
                typeof (error as ErrorWithResponse).response === "object"
            ) {
                const err = error as ErrorWithResponse;
                toast.error(err.response?.data?.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    })
    return mutation
}

export const useResetPassword = () => {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: ResetPasswordApi,
        onSuccess() {
            toast.success("updated successfully")
            navigate("/auth/login")
        },
        onError(error: unknown) {
            type ErrorWithResponse = {
                response?: {
                    data?: {
                        message?: string;
                    };
                };
            };

            if (
                typeof error === "object" &&
                error !== null &&
                "response" in error &&
                typeof (error as ErrorWithResponse).response === "object"
            ) {
                const err = error as ErrorWithResponse;
                toast.error(err.response?.data?.message);
            } else {
                toast.error("An unexpected error occurred.");
            }
        }

    })
    return mutation
}