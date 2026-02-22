import { useQuery } from "@tanstack/react-query"
import { getCompanyDetailApi } from "@/api/admin.api"

export function useAdminCompanyDetail(id: string) {
    return useQuery({
        queryKey: ["admin", "companies", id],
        queryFn: () => getCompanyDetailApi(id),
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
    })
}
