import api from "./apiClient";

import { type ProfileUpdatePayload, type IUser, type UpdateAboutPayload, } from "../types/profileUpdate.type";
import type { Experience } from "@/features/candidate/types/Experience.types";
import type { Education } from "@/features/candidate/types/Education.types";

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
    const res=await api.put("/user/update-profile-about",payload)
    return res.data.data
}

export const addProfileExperienceApi=async(payload:Experience):Promise<IUser>=>{
    const res=await api.post("/candidate/profile/experience",{experience:payload})
    return res.data.data
}

export const updateProfileExperienceApi=async({payload,experienceId}:{payload:Experience,experienceId:string}):Promise<IUser>=>{
    console.log(payload)
    const res=await api.put(`/candidate/profile/experience/${experienceId}`,{experience:payload})
    return res.data.data
}
export const updateProfileSkillApi=async(payload:string[]):Promise<IUser>=>{
    console.log(payload)
    const res=await api.put("/candidate/profile/skill",payload)
    return res.data.data
}

export const addProfileEducationApi=async(payload:Education):Promise<IUser>=>{
    const res=await api.post("/candidate/profile/education",{education:payload})
    return res.data.data
}

export const updateProfileEducationApi=async({payload,educationId}:{payload:Education,educationId:string}):Promise<IUser>=>{
    const res=await api.put(`/candidate/profile/education/${educationId}`,{education:payload})
    return res.data.data
}