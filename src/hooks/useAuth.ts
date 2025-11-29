import {  useMutation } from "@tanstack/react-query";
import { LoginApi } from "@/api/auth.api";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";

export const useLogin=()=>{
    const navigate=useNavigate()
    const setUser=useAuthStore((s)=>s.setUser)

    const mutation=useMutation({
        mutationFn:LoginApi,
        onSuccess(data){
            setUser(data.user)

            if(!data.user.isVerified){
                navigate("/verify-otp")
                return
            }
            navigate("/dashboard")
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