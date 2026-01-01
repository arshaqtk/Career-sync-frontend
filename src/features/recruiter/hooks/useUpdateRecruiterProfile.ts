import { updateRecruiterAvatarApi, updateRecruiterProfileApi } from "@/api/recruiter.api"
import { QUERY_KEYS } from "@/config/queryKeys"
import type { IUser, ProfileUpdatePayload } from "@/types/profileUpdate.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useUpdateRecruiterProfile=()=>{
     const navigate=useNavigate()
    const queryClient=useQueryClient()
     return useMutation<IUser, Error, ProfileUpdatePayload>({
             mutationFn:updateRecruiterProfileApi,
             onSuccess:(updatedUser)=>{
                queryClient.setQueryData([QUERY_KEYS.recruiter.profile], updatedUser)
                toast.success("Profile updated successfully")
                navigate("/recruiter/profile")
             }, onError(error: unknown) {ErrorHandler(error) }
     })
}

export const useUpdateProfileImage=()=>{
     const navigate=useNavigate()
    const queryClient=useQueryClient()
     return useMutation<IUser, Error, FormData>({
             mutationFn:updateRecruiterAvatarApi,
             onSuccess:(updatedUser)=>{
                queryClient.setQueryData([QUERY_KEYS.recruiter.profile], updatedUser)
                toast.success("Profile updated successfully")
                navigate("/profile")  },
            onError(error: unknown) { {ErrorHandler(error) } }
     })
}


const ErrorHandler=(error:unknown)=>{
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