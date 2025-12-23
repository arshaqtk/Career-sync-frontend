import { type LoginFormValues, type RegisterFormValues } from "@/features/auth/validators/auth.schema";
import api from "./apiClient";

type VerifyOtpPayload = {
  email: string;
  otp: string;
};

export const LoginApi=async (data:LoginFormValues)=>{
    const res= await api.post("/auth/login",data)
    return res.data
}

export const LogoutApi=async ()=>{
  await api.post("/auth/logout")
}

export const RegisterApi=async (data:RegisterFormValues)=>{
   
    const res= await api.post("/auth/register",data)
    return res.data
}

export const VerifyRegisterOtpApi=async(data:VerifyOtpPayload)=>{
const res= await api.post("/auth/verify-register-otp",data) 
    return res.data
} 
export const ResendRegisterOtp=async(email:string)=>{
const res=await api.post("/auth/resend-register-otp",{email})
return res.data
}


export const SendResetPasswordEmail=async(email:string)=>{
const res=await api.post("/auth/forgot-password",{email})
return res.data
}

export const ResendResetPasswordOtp=async(email:string)=>{
const res=await api.post("/auth/resend-forgot-password-otp",{email})
return res.data
}
export const VerifyResetPasswordOtpApi=async(data:VerifyOtpPayload)=>{
const res= await api.post("/auth/verify-reset-password",data) 
    return res.data
} 

export const ResetPasswordApi=async(data:{password:string,confirmPassword:string,email:string,resetToken:string})=>{
    const res= await api.post("/auth/reset-password",data) 
    return res.data
}