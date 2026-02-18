import { useState } from "react";
import { Search, Loader2, Building2 } from "lucide-react";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/shadcn/card";
import { useSearchCompanies, useJoinCompany } from "../../hooks/useCompanyOnboarding";
import { useDebounce } from "@/hooks/useDebounce";
import type { ICompany } from "../../types/company.types";

export function CompanySearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const { data: searchResults, isLoading: isSearching } = useSearchCompanies(debouncedSearchQuery);
    const joinCompanyMutation = useJoinCompany();

    const handleJoin = (companyId: string) => {
        joinCompanyMutation.mutate(companyId);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Find Your Company</CardTitle>
                <CardDescription>
                    Search for your company by name and request to join.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search company name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {isSearching && (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    )}

                    {!isSearching && searchResults && searchResults?.data?.length === 0 && searchQuery.length >= 2 && (
                        <div className="text-center py-8 text-gray-500">
                            No companies found. Try a different name or create a new one.
                        </div>
                    )}

                    {!isSearching && searchResults?.data?.map((company: ICompany) => (
                        <div
                            key={company._id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                    {company.logo?.url ? (
                                        <img src={company.logo.url} alt={company.name} className="h-full w-full object-cover" />
                                    ) : (
                                        <Building2 className="h-6 w-6 text-gray-500" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                     <h4
                                        className="font-semibold text-gray-900 truncate hover:text-primary hover:underline cursor-pointer"
                                        onClick={() => window.open(`/companies/${company._id}`, '_blank')}
                                    >
                                        {company.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 truncate">
                                        {company.location} • {company.industry}
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={() => handleJoin(company._id)}
                                disabled={joinCompanyMutation.isPending}
                                variant="outline"
                                className="ml-4 shrink-0"
                            >
                                {joinCompanyMutation.isPending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    "Join"
                                )}
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
