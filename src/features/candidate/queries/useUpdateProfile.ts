import { updateProfileApi } from "@/api/profile.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUser, ProfileUpdatePayload } from "@/types/profileUpdate.type";
import { QUERY_KEYS } from "../../../queries/queryKeys";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';

export const useUpdateProfile=()=>{
     const navigate=useNavigate()
  
    const queryClient=useQueryClient()
     return useMutation<IUser, Error, ProfileUpdatePayload>({
         
             mutationFn:updateProfileApi,
             onSuccess:(updatedUser)=>{
                queryClient.setQueryData([QUERY_KEYS.user], updatedUser)
                toast.success("user Data updated successfully")
                navigate("/candidate-profile")
             },
     })
     
}