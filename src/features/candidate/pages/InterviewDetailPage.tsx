import { useNavigate, useParams } from "react-router-dom"
import { useCandidateInterviewDetail } from "../hooks/useCandidateInterviewDetail"
import { InterviewSummaryCard } from "../components/interview/InterviewSummaryCard"
import { InterviewJoinSection } from "../components/interview/InterviewJoinSection"
import { InterviewTimeline } from "../components/interview/InterviewTimeline"
import { InterviewNotes } from "../components/interview/InterviewNotes"
import { SectionSkeleton } from "@/components/Loaders"
import { handleRQError } from "@/lib/react-query/errorHandler"
import { Button } from "@/components/ui/shadcn/button"
import { ChevronLeft } from "lucide-react"

export default function InterviewDetailPage() {
  const { interviewId } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, error } = useCandidateInterviewDetail(interviewId!)

  if (isLoading) {
    return <SectionSkeleton />
  }

  if (error) handleRQError(error)

  const { interview, timeline } = data

  return (
    <div className="min-h-screen bg-slate-50/30 py-8">
      <div className="container mx-auto max-w-5xl px-4 md:px-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 text-slate-500 hover:text-blue-600 font-medium p-0 h-auto hover:bg-transparent group"
          onClick={() => navigate("/interviews")}
        >
          <ChevronLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
          Back to Interviews
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <InterviewSummaryCard interview={interview} />
            <InterviewTimeline timeline={timeline} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <InterviewJoinSection interview={interview} />
            <InterviewNotes notes={interview.notes} />
          </div>
        </div>
      </div>
    </div>
  )
}

