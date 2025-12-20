import { useState } from "react";
import { PageHeader } from "../components/shared/PageHeader";
import { InterviewFilters } from "../components/list/InterviewFIlters";
import { InterviewTable } from "../components/list/InterviewTable";
import { InterviewsPagination } from "../components/list/InterviewsPagination";
import { useRecruiterInterviews } from "../../hooks/useRecruiterInterviews";
import type { InterviewListFilters } from "../types/interview.type";

export default function RecruiterInterviewsPage() {
  const [filters, setFilters] = useState<InterviewListFilters>({
    status: "All",
    search: "",
  });


  const [page, setPage] = useState(1);

  const { data:interviews, isLoading } = useRecruiterInterviews({
    ...filters,
    page,
  });


  return (
    <div className="space-y-6">
      <PageHeader
        title="Interview Schedule"
        description="View all scheduled interviews"
      />

      <InterviewFilters
        filters={filters}
        onChange={setFilters}
      />

      <InterviewTable
        interviews={interviews?.data}
        isLoading={isLoading}
      />

      <InterviewsPagination
        page={page}
        totalPages={interviews?.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
}
