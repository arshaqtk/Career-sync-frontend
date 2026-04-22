import { useMutation, useQueryClient } from "@tanstack/react-query"
import { blockUserApi, unblockUserApi } from "../../../api/chat.api"
import { useChatStore } from "../store/chat.store"
import { toast } from "sonner"

export const useBlockUser = () => {
    const queryClient = useQueryClient()
    const { setBlockedState, isMeBlocked } = useChatStore()

    return useMutation({
        mutationFn: ({ conversationId, targetUserId }: { conversationId: string, targetUserId: string }) => blockUserApi({ conversationId, targetUserId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] })
            setBlockedState({ blockedByMe: true, meBlocked: isMeBlocked })
            toast.success("User blocked")
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to block user")
        }
    })
}

export const useUnblockUser = () => {
    const queryClient = useQueryClient()
    const { setBlockedState, isMeBlocked } = useChatStore()

    return useMutation({
        mutationFn: ({ conversationId, targetUserId }: { conversationId: string, targetUserId: string }) => unblockUserApi({ conversationId, targetUserId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["conversations"] })
            setBlockedState({ blockedByMe: false, meBlocked: isMeBlocked })
            toast.success("User unblocked")
        },
        onError: (err: any) => {
            toast.error(err?.response?.data?.message || "Failed to unblock user")
        }
    })
}
