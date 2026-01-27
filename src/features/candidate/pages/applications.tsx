import { ApplicationsFilter } from "../components/applications/applicationFilter";
import { useApplicationData } from "../hooks/useApplication";
import type { ApplicationFilters } from "../types/applicationFilter.types";
import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/shadcn/pagination";
import { SectionSkeleton } from "@/components/Loaders";
import { handleRQError } from "@/lib/react-query/errorHandler";
import EmptyApplications from "../components/applications/emptyApplications";
import ApplicationsCardList from "../components/applications/applicationCard";
import { cn } from "@/lib/utils";

export default function ApplicationsPage() {
  const [filters, setFilters] = useState<ApplicationFilters>({
    status: "all",
    sortBy: "newest",
  });

  const [page, setPage] = useState(1);
  const limit = 10;

  const candidateId = useAuthStore(
    (state) => state.user?.id
  ) as string;

  const { data, isLoading, error } = useApplicationData({
    candidateId,
    filters,
    page,
    limit,
  });

  if (isLoading) {
    return <SectionSkeleton />
  }
  if (error) handleRQError(error)

  const { applications, pagination } = data;

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-5xl px-4 md:px-6 h-[calc(100vh-64px)] flex flex-col pt-2">
        {/* Header/Filters */}
        <div className="flex-none mb-1">
          <ApplicationsFilter
            filters={filters}
            onChange={(f) => {
              setPage(1);
              setFilters(f);
            }}
          />
        </div>

        {/* Results Info */}
        {!isLoading && applications.length > 0 && (
          <div className="flex-none mb-2 px-1">
            <h2 className="text-[12px] font-bold text-slate-500 uppercase tracking-tight">
              {pagination.totalApplications || 0} applications in total
            </h2>
          </div>
        )}

        {/* Content */}
        {!isLoading && applications.length === 0 ? (
          <EmptyApplications />
        ) : (
          <div className="flex-1 overflow-y-auto pr-2 scrollbar-hide pb-20 md:pb-6">
            <ApplicationsCardList applications={applications} />
          </div>
        )}

        {/* Pagination bar */}
        {!isLoading && applications.length > 0 && pagination.totalPages > 1 && (
          <div className="flex-none py-4 border-t border-slate-100 bg-white">
            <Pagination className="justify-center">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className={cn(
                      "cursor-pointer",
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    )}
                  />
                </PaginationItem>

                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === page}
                      onClick={() => setPage(p)}
                      className="cursor-pointer"
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(p + 1, pagination.totalPages))}
                    className={cn(
                      "cursor-pointer",
                      page === pagination.totalPages ? "pointer-events-none opacity-50" : ""
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}


