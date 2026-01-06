import { useState } from "react"
import { useCandidateInterviews } from "../hooks/useCandidateInterviews"
import { InterviewListTabs } from "../components/interview/InterviewListTabs"
import { InterviewListCard } from "../components/interview/InterviewListCard"
import { InterviewEmptyState } from "../components/interview/InterviewEmptyState"
import type { CandidateInterview } from "../types/interview.types"
import { SectionSkeleton } from "@/components/Loaders"
import { handleRQError } from "@/lib/react-query/errorHandler"

export default function MyInterviewsPage() {
  const [tab, setTab] = useState("upcoming")
  const { data, isLoading ,error} = useCandidateInterviews()

  if (isLoading) {
      return <SectionSkeleton />
    }
  if(error)handleRQError(error)

  const interviews = data?.[tab] ?? []

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Interviews</h1>

      <InterviewListTabs value={tab} onChange={setTab} />

      {interviews.length === 0 ? (
        <InterviewEmptyState />
      ) : (
        <div className="space-y-4">
          {interviews.map((interview:CandidateInterview) => (
            <InterviewListCard
              key={interview._id}
              interview={interview}
            />
          ))}
        </div>
      )}
    </div>
  )
}
