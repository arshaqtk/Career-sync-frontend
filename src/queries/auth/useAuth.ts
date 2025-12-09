import {  useMutation } from "@tanstack/react-query";
import { LoginApi, RegisterApi, ResendRegisterOtp, VerifyRegisterOtpApi } from "@/api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

export const useRegister=()=>{
    const navigate=useNavigate()
  

    const mutation=useMutation({
        mutationFn:RegisterApi,
        onSuccess(data: { email: string }){
           navigate("/verify-otp", { state: { email: data.email } })
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
            console.log("RQ ERROR:", err.response?.data);
            toast.error(err.response?.data?.message);
        } else {
            console.log("RQ ERROR:", error);
            toast.error("An unexpected error occurred.");
        }
    }
    })
    return mutation
} 

export const useLogin=()=>{
    const navigate=useNavigate()
    const setUser=useAuthStore((s)=>s.setUser)

    const mutation=useMutation({
        mutationFn:LoginApi,
        onSuccess(data){
            setUser(data.user)

            if(!data.user.isVerified){
                toast.success(data?.message);
                navigate("/verify-otp",{ state: { email: data.user.email } })
                return
            }
            console.log(data.user)
            if(data.user.role=="recruiter"){
                navigate("/recruiter")
            }else{
                navigate("/")
            }
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
            console.log("RQ ERROR:", err.response?.data);
            toast.error(err.response?.data?.message);
        } else {
            console.log("RQ ERROR:", error);
            toast.error("An unexpected error occurred.");
        }
    }
    })
    return mutation
} 


export const useResendRegisterOtpMutation =()=>{ 
const mutation =useMutation({
  mutationFn: ResendRegisterOtp,
  onSuccess: () => {
    toast.success("OTP resent successfully");
  },
  onError: () => {
    toast.error("Something went wrong");
  }
})
return mutation
}

export const useVerifyRegisterOtp=()=>{
    const navigate=useNavigate()
   const mutation= useMutation({
        mutationFn:VerifyRegisterOtpApi,
        onSuccess(){
            navigate("/login")
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
            console.log("RQ ERROR:", err.response?.data);
            toast.error(err.response?.data?.message);
        } else {
            console.log("RQ ERROR:", error);
            toast.error("An unexpected error occurred.");
        }
    }
    })
    return mutation
} 


