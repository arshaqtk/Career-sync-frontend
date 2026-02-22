import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCompanyApi, searchCompaniesApi, joinCompanyApi, getCompanyByIdApi } from "@/api/recruiter.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useUserData from "@/hooks/useUserData";
import { QUERY_KEYS } from "@/config/queryKeys";
import type { AxiosError } from "axios";
import { getCompanyJobsApi } from "@/api/company.api";

export const useCreateCompany = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { refetch } = useUserData();

    return useMutation({
        mutationFn: createCompanyApi,
        onSuccess: async () => {
            toast.success("Company created successfully!");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] });
            await refetch();
            navigate("/recruiter");
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Failed to create company");
        },
    });
};

export const useJoinCompany = () => {
    const queryClient = useQueryClient();
    const { refetch } = useUserData();

    return useMutation({
        mutationFn: joinCompanyApi,
        onSuccess: async () => {
            toast.success("Join request sent successfully!");
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] });
            await refetch();
            // Automatically stays on the page to show the pending message
        },
        onError: (error: AxiosError<{ message: string }>) => {
            toast.error(error.response?.data?.message || "Failed to join company");
        },
    });
};

export const useSearchCompanies = (query: string) => {
    return useQuery({
        queryKey: ["companies", "search", query],
        queryFn: () => searchCompaniesApi(query),
        enabled: query.length >= 2, // Only search if query has at least 2 chars
        staleTime: 1000 * 60, // 1 minute
    });
};

export const useCompanyDetails = (companyId: string) => {
    return useQuery({
        queryKey: ["companies", companyId],
        queryFn: () => getCompanyByIdApi(companyId),
        enabled: !!companyId,
    });
};

export const useCompanyJobDetails = (companyId: string) => {
    return useQuery({
        queryKey: ["companies", "jobs", companyId],
        queryFn: () => getCompanyJobsApi(companyId),
        enabled: !!companyId,
    });
};