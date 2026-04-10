import { ClipboardList, CalendarPlus, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { Button } from "@/components/ui/shadcn/button"
import { Skeleton } from "@/components/ui/shadcn/skeleton"
import { useNavigate } from "react-router-dom"

interface ActionItem {
  label: string
  count: number
  action: "review" | "schedule" | "feedback"
}

interface ActionCenterProps {
  data?: ActionItem[]
  loading?: boolean
}

const DUMMY_ACTIONS: ActionItem[] = [
  { label: "Applications Pending Review", count: 8, action: "review" },
  { label: "Interviews to Schedule", count: 3, action: "schedule" },
]

export function ActionCenter({ data, loading }: ActionCenterProps) {
  const actions = data ?? DUMMY_ACTIONS

  return (
    <Card className="h-full border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle>Action Center</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-8 w-20" />
              </div>
            ))
          : actions.map((item) => (
              <ActionRow key={item.action} item={item} />
            ))}
      </CardContent>
    </Card>
  )
}

/* ---------------- Sub Component ---------------- */

function ActionRow({ item }: { item: ActionItem }) {
  const navigate = useNavigate()
  const iconMap = {
    review: <ClipboardList className="h-5 w-5 text-blue-600" />,
    schedule: <CalendarPlus className="h-5 w-5 text-orange-600" />,
    feedback: <MessageSquare className="h-5 w-5 text-green-600" />,
  }

  const destinationMap = {
    review: "/recruiter/applicants",
    schedule: "/recruiter/applicants",
    feedback: "/recruiter/interviews",
  } as const

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/60 p-4 transition hover:bg-muted/40 md:flex-row md:items-center md:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
          {iconMap[item.action]}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{item.label}</p>
          <p className="text-xs text-muted-foreground">
            {item.count} item{item.count === 1 ? "" : "s"} waiting
          </p>
        </div>
      </div>

      <Button size="sm" variant="outline" className="self-start md:self-auto" onClick={() => navigate(destinationMap[item.action])}>
        View
      </Button>
    </div>
  )
}
