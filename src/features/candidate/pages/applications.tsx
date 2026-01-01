import {ApplicationsFilter} from "../components/applications/applicationFilter";
import ApplicationsTable from "../components/applications/applicationTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { useApplicationData } from "../hooks/useApplication";
import type { ApplicationFilters } from "../types/applicationFilter.types";
import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/shadcn/pagination";

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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load user</p>;

  const { applications, pagination } = data;
console.log(applications)
  return (
    <div className="space-y-6">
      <ApplicationsFilter
        filters={filters}
        onChange={(f) => {
          setPage(1); // 🔥 reset page on filter change
          setFilters(f);
        }}
      />

      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <ApplicationsTable applications={applications} />

          
          {pagination.totalPages > 1 && (
            <Pagination className="justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      setPage((p) => Math.max(p - 1, 1))
                    }
                    className={
                      page === 1
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
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
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      setPage((p) =>
                        Math.min(p + 1, pagination.totalPages)
                      )
                    }
                    className={
                      page === pagination.totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

