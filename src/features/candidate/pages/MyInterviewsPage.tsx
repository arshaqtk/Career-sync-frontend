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
  const { data, isLoading, error } = useCandidateInterviews()

  if (isLoading) {
    return <SectionSkeleton />
  }
  if (error) handleRQError(error)

  const interviews = data?.[tab] ?? []

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-5xl px-4 md:px-6 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold text-slate-900">My Interviews</h1>
            <p className="text-slate-500 text-sm font-medium">
              Manage your upcoming and past interview schedules
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <InterviewListTabs value={tab} onChange={setTab} />

            <div className="flex-none px-1">
              <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">
                {interviews.length} {tab} interviews found
              </span>
            </div>

            {interviews.length === 0 ? (
              <InterviewEmptyState />
            ) : (
              <div className="flex flex-col gap-3">
                {interviews.map((interview: CandidateInterview) => (
                  <InterviewListCard key={interview._id} interview={interview} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

