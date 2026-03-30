import { useMutation } from "@tanstack/react-query";
import { LoginApi, RegisterApi, ResendRegisterOtp, VerifyRegisterOtpApi } from "@/api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

export const useRegister = () => {
    const navigate = useNavigate()


    const mutation = useMutation({
        mutationFn: RegisterApi,
        onSuccess(data: { email: string }) {
            navigate("/auth/verify-otp", { state: { email: data.email } })
        }
    })
    return mutation
}

export const useLogin = () => {
    const navigate = useNavigate()
    const setUser = useAuthStore((s) => s.setUser)

    const mutation = useMutation({
        mutationFn: LoginApi,
        onSuccess(data) {
            setUser(data.user)
            if (!data.user.isVerified) {
                toast.success(data?.message);
                navigate("/auth/verify-otp", { state: { email: data.user.email } })
                return
            }


            if (data.user.role == "recruiter") {
                navigate("/recruiter")
            } else if (data.user.role == "admin") {
                navigate("/admin")
            }
            else {
                navigate("/")
            }

        }
    })
    return mutation
}


export const useResendRegisterOtpMutation = () => {
    const mutation = useMutation({
        mutationFn: ResendRegisterOtp,
        onSuccess: () => {
            toast.success("OTP resent successfully");
        }
    })
    return mutation
}

export const useVerifyRegisterOtp = () => {
    const navigate = useNavigate()
    const mutation = useMutation({
        mutationFn: VerifyRegisterOtpApi,
        onSuccess() {
            navigate("/auth/login")
        }
    })
    return mutation
}


