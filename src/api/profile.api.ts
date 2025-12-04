import api from "./apiClient";

import { type ProfileUpdatePayload, type IUser, type UpdateAboutPayload, } from "../types/profileUpdate.type";

export const fetchProfile=async()=>{
   const res=await api.get("/user/profile")
   return res.data
}

export const updateProfileApi=async(payload:ProfileUpdatePayload):Promise<IUser>=>{
    const res=await api.put("/user/update-profile-basic",payload)
    return res.data.data
}

export const updateAvatarApi=async(payload:FormData):Promise<IUser>=>{
    const res=await api.put("/user/update-profile-avatar",payload)
    return res.data.data
} 

export const updateProfileAboutApi=async(payload:UpdateAboutPayload):Promise<IUser>=>{
    console.log(payload)
    const res=await api.put("/user/update-profile-about",payload)
    return res.data.data
}

