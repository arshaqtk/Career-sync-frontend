import { addProfileEducationApi, addProfileExperienceApi, deleteResumeApi, updateAvatarApi, updateProfileAboutApi, updateProfileApi, updateProfileEducationApi, updateProfileExperienceApi, updateProfileSkillApi, updateResumeApi } from "@/api/profile.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUser, ProfileUpdatePayload, UpdateAboutPayload } from "@/types/profileUpdate.type";
import { QUERY_KEYS } from "../../../config/queryKeys";
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner';
import type { Experience } from "../types/Experience.types";
import type { Education } from "../types/Education.types";

type UpdateExperienceVars = {
    experienceId: string;
    payload: Experience;
};
type UpdateEduactionVars = {
    educationId: string;
    payload: Education;
}


export const useUpdateProfile = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation<IUser, Error, ProfileUpdatePayload>({
        mutationFn: updateProfileApi,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData([QUERY_KEYS.user], updatedUser)
            toast.success("user Data updated successfully")
            navigate("/profile")
        }
    })
}

export const useUpdateProfileImage = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation<IUser, Error, FormData>({
        mutationFn: updateAvatarApi,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData([QUERY_KEYS.user], updatedUser)
            toast.success("Profile updated successfully")
            navigate("/profile")
        }
    })
}

export const useUpdateProfileAbout = () => {
    const queryClient = useQueryClient()
    return useMutation<IUser, Error, UpdateAboutPayload>({
        mutationFn: updateProfileAboutApi,
        onSuccess: (updatedUser: IUser) => {
            queryClient.setQueryData([QUERY_KEYS.user], updatedUser)
            toast.success("Profile updated successfully")
        }
    })
}

//-------------------Experience--------------------------

export const useAddProfileExperience = () => {
    const queryClient = useQueryClient()
    return useMutation<IUser, Error, Experience>({
        mutationFn: addProfileExperienceApi,
        onSuccess: (updatedUser: IUser) => {
            queryClient.setQueryData([QUERY_KEYS.user], updatedUser)
            toast.success("Experience Added Successfully")
        }
    })
}


export const useUpdateProfileExperience = () => {
    const queryClient = useQueryClient()
    return useMutation<IUser, Error, UpdateExperienceVars>({
        mutationFn: updateProfileExperienceApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] })
            toast.success("Experience Updated Successfully")
        }
    })
}


//--------------Skill----------------------------

export const useUpdateProfileSkill = () => {
    const queryClient = useQueryClient()
    return useMutation<IUser, Error, string[]>({
        mutationFn: updateProfileSkillApi,
        onSuccess: (updatedUser: IUser) => {
            queryClient.setQueryData([QUERY_KEYS.user], updatedUser)
            toast.success("Skill updated successfully")
        }
    })
}

//------------------Education-----------------------

export const useAddProfileEducation = () => {
    const queryClient = useQueryClient()
    return useMutation<IUser, Error, Education>({
        mutationFn: addProfileEducationApi,
        onSuccess: (updatedUser: IUser) => {
            queryClient.setQueryData([QUERY_KEYS.user], updatedUser)
            toast.success("Education Added Successfully")
        }
    })
}


export const useUpdateProfileEducation = () => {
    const queryClient = useQueryClient()
    return useMutation<IUser, Error, UpdateEduactionVars>({
        mutationFn: updateProfileEducationApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] })
            toast.success("Education Updated Successfully")
        }
    })
}

export const useUpdateResume = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: updateResumeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] })
            toast.success("Resume Updated Successfully")
        }
    })
}

//--------------------Delete Resume-----------------------------------------
export const useDeleteResume = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteResumeApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] })
            toast.success("Resume deleted Successfully")
        }
    })
}