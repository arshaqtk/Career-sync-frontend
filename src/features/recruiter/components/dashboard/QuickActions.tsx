import { PlusCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { Button } from "@/components/ui/shadcn/button"
import { useJobModalStore } from "../../store/openJobModalStore";

export function QuickActions() {
  const { openModal } = useJobModalStore();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <Button
          className="w-full justify-start gap-3"
          onClick={()=>openModal()}
        >
          <PlusCircle className="h-5 w-5" />
          Post New Job
        </Button>

        {/* <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/recruiter/interviews/schedule")}
        >
          <CalendarPlus className="h-5 w-5" />
          Schedule Interview
        </Button> */}

        {/* <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/recruiter/candidates/add")}
        >
          <UserPlus className="h-5 w-5" />
          Add Candidate
        </Button> */}
      </CardContent>
    </Card>
  )
}
