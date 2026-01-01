import { ClipboardList, CalendarPlus, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { Button } from "@/components/ui/shadcn/button"
import { Skeleton } from "@/components/ui/shadcn/skeleton"

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
  { label: "Feedback Pending", count: 2, action: "feedback" },
]

export function ActionCenter({ data, loading }: ActionCenterProps) {
  const actions = data ?? DUMMY_ACTIONS

  return (
    <Card>
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
  const iconMap = {
    review: <ClipboardList className="h-5 w-5 text-blue-600" />,
    schedule: <CalendarPlus className="h-5 w-5 text-orange-600" />,
    feedback: <MessageSquare className="h-5 w-5 text-green-600" />,
  }

  return (
    <div className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted transition">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-md bg-muted">
          {iconMap[item.action]}
        </div>

        <div>
          <p className="text-sm font-medium">{item.label}</p>
          <p className="text-xs text-muted-foreground">
            {item.count} pending
          </p>
        </div>
      </div>

      <Button size="sm" variant="outline">
        View
      </Button>
    </div>
  )
}
