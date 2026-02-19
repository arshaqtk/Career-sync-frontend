import { useState } from "react";
import { InterviewFilters } from "../components/interview/list/InterviewFIlters";
import { InterviewTable } from "../components/interview/list/InterviewTable";
import { InterviewsPagination } from "../components/interview/list/InterviewsPagination";
import { useRecruiterInterviews } from "../hooks/useRecruiterInterviews";
import type { InterviewListFilters } from "../types/interview.type";
import { useAuthStore } from "@/store/auth.store";
import { handleRQError } from "@/lib/react-query/errorHandler";
import { EmptyInterviewsState } from "../components/interview/list/emptyInterviewState";
import { TableSkeleton } from "@/components/Skelton/TableSkelton";

export default function RecruiterInterviewsPage() {
  const [filters, setFilters] = useState<InterviewListFilters>({
    status: "All",
    search: "",
  });

const {user}=useAuthStore()
  const [page, setPage] = useState(1);

  const { data:interviews, isLoading,error } = useRecruiterInterviews(user?.id as string,{ ...filters, page, });
  if(error)handleRQError(error)


   return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">Interview Schedule</h1>
        <p className="mt-1 text-sm text-gray-500">Manage and track all scheduled interviews</p>
      </div>

      {/* Filters Section */}
      <div>
        <InterviewFilters
          filters={filters}
          onChange={setFilters}
        />
      </div>

    {isLoading ? (
        <TableSkeleton rows={6} columns={5} />
      ) : !isLoading && interviews?.data?.length === 0 ? (
        <EmptyInterviewsState />
      ) : (
        <>
          <InterviewTable
            interviews={interviews?.data}
            isLoading={isLoading}
          />

          {interviews && interviews.totalPages > 1 && (
            <InterviewsPagination
              page={page}
              totalPages={interviews?.totalPages || 1}
              onPageChange={setPage}
            />
          )}
        </>
      )}
    </div>
  );
}
