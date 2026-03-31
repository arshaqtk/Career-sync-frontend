import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPendingRecruitersApi, approveRecruiterApi, rejectRecruiterApi } from "@/api/recruiter.api";
import { toast } from "sonner";
import { handleRQError } from "@/lib/react-query/errorHandler";

export function useManageRecruiters(companyId: string | undefined) {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ["pending-recruiters", companyId],
        queryFn: () => getPendingRecruitersApi(companyId!),
        enabled: !!companyId,
    });

    const approveMutation = useMutation({
        mutationFn: (recruiterId: string) => approveRecruiterApi({ companyId: companyId!, recruiterId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pending-recruiters", companyId] });
            toast.success("Recruiter approved successfully");
        },
        onError: handleRQError
    });

    const rejectMutation = useMutation({
        mutationFn: (recruiterId: string) => rejectRecruiterApi({ companyId: companyId!, recruiterId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pending-recruiters", companyId] });
            toast.success("Recruiter rejected");
        },
        onError: handleRQError
    });

    return {
        pendingRecruiters: data?.data || [],
        isLoading,
        error,
        approveRecruiter: approveMutation.mutate,
        isApproving: approveMutation.isPending,
        rejectRecruiter: rejectMutation.mutate,
        isRejecting: rejectMutation.isPending,
    };
}
