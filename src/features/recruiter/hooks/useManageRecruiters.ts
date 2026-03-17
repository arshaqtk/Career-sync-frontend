import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPendingRecruitersApi, approveRecruiterApi, rejectRecruiterApi } from "@/api/recruiter.api";
import { toast } from "sonner";

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
        }
    });

    const rejectMutation = useMutation({
        mutationFn: (recruiterId: string) => rejectRecruiterApi({ companyId: companyId!, recruiterId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pending-recruiters", companyId] });
            toast.success("Recruiter rejected");
        }
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
