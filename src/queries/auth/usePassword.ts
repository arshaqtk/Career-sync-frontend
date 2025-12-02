import { ResetPasswordApi, SendResetPasswordEmail, VerifyResetPasswordOtpApi } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useSendResetPasswordEmail=()=>{
    const mutate=useMutation({
        mutationFn:SendResetPasswordEmail,
        onSuccess(){
            alert("Otp Sented Successfully")
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
            alert(err.response?.data?.message);
        } else {
            console.log("RQ ERROR:", error);
            alert("An unexpected error occurred.");
        }
    }
    })

    return mutate

}
export const useVerifyResetPasswordOtp=()=>{
    const navigate=useNavigate()
   const mutation= useMutation({
        mutationFn:VerifyResetPasswordOtpApi,
        onSuccess(data:{email:string,resetToken:string,message:string}){
            alert(data.message)
             navigate("/reset-password", {
      state: {
        email:data.email,
        resetToken:data.resetToken,
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
            console.log("RQ ERROR:", err.response?.data);
            alert(err.response?.data?.message);
        } else {
            console.log("RQ ERROR:", error);
            alert("An unexpected error occurred.");
        }
    }
    })
    return mutation
} 

export const useResetPassword=()=>{
    const mutation=useMutation({
        mutationFn:ResetPasswordApi,
        onSuccess(){
            alert("updated successfully")
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
            alert(err.response?.data?.message);
        } else {
            console.log("RQ ERROR:", error);
            alert("An unexpected error occurred.");
        }
    }

    })
    return mutation
}