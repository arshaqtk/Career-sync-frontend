import { useQuery } from "@tanstack/react-query"
import { getCompaniesListApi, type CompanyFilters } from "@/api/admin.api"

export function useAdminCompanies(params: CompanyFilters) {
    return useQuery({
        queryKey: ["admin", "companies", params],
        queryFn: () => getCompaniesListApi(params),
        placeholderData: (previousData) => previousData,
        staleTime: 1000 * 60 * 5,
    })
}
