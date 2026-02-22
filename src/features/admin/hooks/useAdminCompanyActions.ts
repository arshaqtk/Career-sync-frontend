import { useMutation, useQueryClient } from "@tanstack/react-query"
import { approveCompanyApi, rejectCompanyApi, blockCompanyApi, unblockCompanyApi } from "@/api/admin.api"
import { toast } from "sonner"
import type { AxiosError } from "axios"

export function useAdminCompanyActions() {
    const queryClient = useQueryClient()

    const approveMutation = useMutation({
        mutationFn: (id: string) => approveCompanyApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "companies"] })
            toast.success("Company approved successfully")
        },
        onError: (error:  AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Failed to approve company")
        }
    })

    const rejectMutation = useMutation({
        mutationFn: (id: string) => rejectCompanyApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "companies"] })
            toast.success("Company rejected successfully")
        },
        onError: (error:  AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Failed to reject company")
        }
    })

    const blockMutation = useMutation({
        mutationFn: ({ id, reason }: { id: string; reason: string }) => blockCompanyApi(id, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "companies"] })
            toast.success("Company blocked successfully")
        },
        onError: (error:  AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Failed to block company")
        }
    })

    const unblockMutation = useMutation({
        mutationFn: (id: string) => unblockCompanyApi(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "companies"] })
            toast.success("Company unblocked successfully")
        },
        onError: (error:  AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Failed to unblock company")
        }
    })

    return {
        approveCompany: approveMutation.mutate,
        isApproving: approveMutation.isPending,
        rejectCompany: rejectMutation.mutate,
        isRejecting: rejectMutation.isPending,
        blockCompany: blockMutation.mutate,
          unblockCompany: unblockMutation.mutate,
        isBlocking: blockMutation.isPending,
         isUnblocking: unblockMutation.isPending
    }
}
