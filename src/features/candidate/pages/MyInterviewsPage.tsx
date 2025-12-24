import { useState } from "react"
import { useCandidateInterviews } from "../hooks/useCandidateInterviews"
import { InterviewListTabs } from "../components/interview/InterviewListTabs"
import { InterviewListCard } from "../components/interview/InterviewListCard"
import { InterviewEmptyState } from "../components/interview/InterviewEmptyState"

export default function MyInterviewsPage() {
  const [tab, setTab] = useState("upcoming")
  const { data, isLoading } = useCandidateInterviews()

  if (isLoading) return <p>Loading interviews...</p>

  const interviews = data?.[tab] ?? []
console.log(data)
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Interviews</h1>

      <InterviewListTabs value={tab} onChange={setTab} />

      {interviews.length === 0 ? (
        <InterviewEmptyState />
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
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
