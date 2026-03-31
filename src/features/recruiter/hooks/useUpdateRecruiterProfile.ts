import { updateRecruiterAvatarApi, updateRecruiterProfileApi } from "@/api/recruiter.api"
import { QUERY_KEYS } from "@/config/queryKeys"
import type { IUser, ProfileUpdatePayload } from "@/types/profileUpdate.type"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { handleRQError } from "@/lib/react-query/errorHandler"

export const useUpdateRecruiterProfile = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation<IUser, Error, ProfileUpdatePayload>({
        mutationFn: updateRecruiterProfileApi,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(QUERY_KEYS.recruiter.profile(), updatedUser)
            toast.success("Profile updated successfully")
            navigate("/recruiter/profile")
        }, onError: handleRQError
    })
}

export const useUpdateProfileImage = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    return useMutation<IUser, Error, FormData>({
        mutationFn: updateRecruiterAvatarApi,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData(QUERY_KEYS.recruiter.profile(), updatedUser)
            toast.success("Profile updated successfully")
            navigate("/recruiter/profile")
        },
        onError: handleRQError
    })
}