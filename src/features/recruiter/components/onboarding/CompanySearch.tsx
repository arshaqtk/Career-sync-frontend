import { useState } from "react";
import { Search, Loader2, Building2, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/shadcn/input";
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
        <div className="space-y-5">
            {/* Header */}
            <div>
                <h3 className="text-lg font-semibold text-slate-900">Find Your Company</h3>
                <p className="text-sm text-slate-500 mt-0.5">
                    Search by name and request to join your employer.
                </p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                    placeholder="Search company name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-11 border-slate-200 bg-slate-50 rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                />
            </div>

            {/* Results */}
            <div className="space-y-2">
                {isSearching && (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                        <Loader2 className="h-6 w-6 animate-spin mb-2" />
                        <span className="text-sm">Searching companies...</span>
                    </div>
                )}

                {!isSearching && searchResults && searchResults?.data?.length === 0 && searchQuery.length >= 2 && (
                    <div className="text-center py-12">
                        <Building2 className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                        <p className="text-sm font-medium text-slate-500">No companies found</p>
                        <p className="text-xs text-slate-400 mt-1">
                            Try a different name or switch to the <span className="font-semibold">"Create New"</span> tab.
                        </p>
                    </div>
                )}

                {!isSearching && !searchQuery && (
                    <div className="text-center py-12">
                        <Search className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                        <p className="text-sm font-medium text-slate-500">Start typing to search</p>
                        <p className="text-xs text-slate-400 mt-1">
                            Enter at least 2 characters to find your company.
                        </p>
                    </div>
                )}

                {!isSearching && searchResults?.data?.map((company: ICompany) => (
                    <div
                        key={company._id}
                        className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-slate-200 hover:bg-slate-50/50 transition-all group"
                    >
                        <div className="flex items-center gap-3.5 min-w-0">
                            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden shrink-0">
                                {company.logo?.url ? (
                                    <img src={company.logo.url} alt={company.name} className="h-full w-full object-cover" />
                                ) : (
                                    <Building2 className="h-5 w-5 text-slate-400" />
                                )}
                            </div>
                            <div className="min-w-0">
                                <h4
                                    className="font-semibold text-sm text-slate-900 truncate hover:text-blue-600 cursor-pointer transition-colors"
                                    onClick={() => window.open(`/companies/${company._id}`, '_blank')}
                                >
                                    {company.name}
                                </h4>
                                <p className="text-xs text-slate-400 truncate">
                                    {[company.location, company.industry].filter(Boolean).join(" · ")}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleJoin(company._id)}
                            disabled={joinCompanyMutation.isPending}
                            className="ml-4 shrink-0 flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 disabled:bg-slate-100 disabled:text-slate-400 rounded-lg transition-colors"
                        >
                            {joinCompanyMutation.isPending ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <>
                                    Join
                                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
