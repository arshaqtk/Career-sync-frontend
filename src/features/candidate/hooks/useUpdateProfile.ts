import { updateAvatarApi, updateProfileAboutApi, updateProfileApi, updateProfileSkillApi } from "@/api/profile.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUser, ProfileUpdatePayload, UpdateAboutPayload } from "@/types/profileUpdate.type";
import { QUERY_KEYS } from "../../../config/queryKeys";
import { useNavigate } from "react-router-dom";
import {  toast } from 'sonner';
import type { Experience } from "../types/Experience.types";



export const useUpdateProfile=()=>{
     const navigate=useNavigate()
    const queryClient=useQueryClient()
     return useMutation<IUser, Error, ProfileUpdatePayload>({
             mutationFn:updateProfileApi,
             onSuccess:(updatedUser)=>{
                queryClient.setQueryData([QUERY_KEYS.user], updatedUser)
                toast.success("user Data updated successfully")
                navigate("/candidate-profile")
             }, onError(error: unknown) {ErrorHandler(error) }
     })
}

export const useUpdateProfileImage=()=>{
     const navigate=useNavigate()
    const queryClient=useQueryClient()
     return useMutation<IUser, Error, FormData>({
             mutationFn:updateAvatarApi,
             onSuccess:(updatedUser)=>{
                queryClient.setQueryData([QUERY_KEYS.user], updatedUser)
                toast.success("Profile updated successfully")
                navigate("/candidate-profile")  },
            onError(error: unknown) { {ErrorHandler(error) } }
     })
}

export const useUpdateProfileAbout=()=>{
    const queryClient=useQueryClient()
    return useMutation<IUser, Error, UpdateAboutPayload>({
             mutationFn:updateProfileAboutApi,
             onSuccess:(updatedUser: IUser)=>{
                queryClient.setQueryData([QUERY_KEYS.user], updatedUser)
                toast.success("Profile updated successfully")
             },
             onError:(error: unknown)=>{ErrorHandler(error) }
     })
}


export const useUpdateProfileExperience=()=>{
    const queryClient=useQueryClient()
    return useMutation<IUser,Error,Experience>({
        mutationFn:updateProfileSkillApi,
        onSuccess:(updatedUser: IUser)=>{
                queryClient.setQueryData([QUERY_KEYS.user], updatedUser)
                toast.success("Skill updated successfully")
             },
             onError:(error: unknown)=>{ErrorHandler(error) }
     })
}

export const useUpdateProfileSkill=()=>{
    const queryClient=useQueryClient()
    return useMutation<IUser,Error,string[]>({
        mutationFn:updateProfileSkillApi,
        onSuccess:(updatedUser: IUser)=>{
                queryClient.setQueryData([QUERY_KEYS.user], updatedUser)
                toast.success("Skill updated successfully")
             },
             onError:(error: unknown)=>{ErrorHandler(error) }
     })
}

//--------------------Error Handler---------------------------------------
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