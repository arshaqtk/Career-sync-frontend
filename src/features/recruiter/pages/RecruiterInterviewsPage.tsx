import { useState } from "react";
import { PageHeader } from "../components/shared/PageHeader";
import { InterviewFilters } from "../components/interview/list/InterviewFIlters";
import { InterviewTable } from "../components/interview/list/InterviewTable";
import { InterviewsPagination } from "../components/interview/list/InterviewsPagination";
import { useRecruiterInterviews } from "../hooks/useRecruiterInterviews";
import type { InterviewListFilters } from "../types/interview.type";
import { useAuthStore } from "@/store/auth.store";

export default function RecruiterInterviewsPage() {
  const [filters, setFilters] = useState<InterviewListFilters>({
    status: "All",
    search: "",
  });

const {user}=useAuthStore()
  const [page, setPage] = useState(1);

  const { data:interviews, isLoading } = useRecruiterInterviews(user?.id as string,{ ...filters, page, });


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
