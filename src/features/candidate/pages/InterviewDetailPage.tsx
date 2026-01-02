import { useParams } from "react-router-dom"
import { useCandidateInterviewDetail } from "../hooks/useCandidateInterviewDetail"
import { InterviewSummaryCard } from "../components/interview/InterviewSummaryCard"
import { InterviewJoinSection } from "../components/interview/InterviewJoinSection"
import { InterviewTimeline } from "../components/interview/InterviewTimeline"
import { InterviewNotes } from "../components/interview/InterviewNotes"
import { SectionSkeleton } from "@/components/Loaders"

export default function InterviewDetailPage() {
  const { interviewId } = useParams()
  const { data, isLoading } = useCandidateInterviewDetail(interviewId!)

   if (isLoading) {
      return <SectionSkeleton />
    }

  const { interview, timeline } = data
  console.log(interview)
  console.log(timeline)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <InterviewSummaryCard interview={interview} />
      <InterviewJoinSection interview={interview} />
      <InterviewTimeline timeline={timeline} />
      <InterviewNotes notes={interview.notes} />
    </div>
  )
}
