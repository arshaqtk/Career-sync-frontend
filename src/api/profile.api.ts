import api from "./apiClient";

import { type ProfileUpdatePayload, type IUser } from "../types/profileUpdate.type";

export const fetchProfile=async()=>{
   const res=await api.get("/user/profile")
   return res.data
}

export const updateProfileApi=async(payload:ProfileUpdatePayload):Promise<IUser>=>{
    const res=await api.put("/user/update-profile",payload)
    return res.data.data
}