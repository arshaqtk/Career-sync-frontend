import { Clock, Video } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card"
import { Button } from "@/components/ui/shadcn/button"
import { Skeleton } from "@/components/ui/shadcn/skeleton"

interface Interview {
  id: string
  candidateName: string
  role: string
  time: string
  round: string
}

interface TodaysInterviewsProps {
  data?: Interview[]
  loading?: boolean
}

const DUMMY_INTERVIEWS: Interview[] = [
  {
    id: "1",
    candidateName: "Rahul Das",
    role: "React Developer",
    time: "10:00 AM",
    round: "Technical Round",
  },
  {
    id: "2",
    candidateName: "Fathima Minsha",
    role: "Backend Developer",
    time: "02:30 PM",
    round: "HR Round",
  },
]

export function TodaysInterviews({
  data,
  loading,
}: TodaysInterviewsProps) {
  const interviews = data ?? DUMMY_INTERVIEWS

  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Interviews</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading ? (
          <SkeletonList />
        ) : interviews.length === 0 ? (
          <EmptyState />
        ) : (
          interviews.map((interview, index) => (
            <TimelineItem
              key={interview.id}
              interview={interview}
              isLast={index === interviews.length - 1}
            />
          ))
        )}
      </CardContent>
    </Card>
  )
}

/* ---------------- Timeline Item ---------------- */

function TimelineItem({
  interview,
  isLast,
}: {
  interview: Interview
  isLast: boolean
}) {
  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="h-3 w-3 rounded-full bg-primary mt-1" />
        {!isLast && (
          <div className="flex-1 w-px bg-border mt-1" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 border rounded-lg p-3">
        <div className="flex items-center justify-between">
          <p className="font-medium">{interview.candidateName}</p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {interview.time}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {interview.role} • {interview.round}
        </p>

        <Button
          size="sm"
          variant="outline"
          className="mt-3 gap-2"
        >
          <Video className="h-4 w-4" />
          Join
        </Button>
      </div>
    </div>
  )
}

/* ---------------- Helpers ---------------- */

function SkeletonList() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-10 w-2 rounded-full" />
          <Skeleton className="h-20 w-full rounded-lg" />
        </div>
      ))}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-8 text-sm text-muted-foreground">
      No interviews scheduled for today
    </div>
  )
}
