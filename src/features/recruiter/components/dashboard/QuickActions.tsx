import { ArrowRight, BriefcaseBusiness, PlusCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import { Button } from "@/components/ui/shadcn/button"
import { useJobModalStore } from "../../store/openJobModalStore";
import { useNavigate } from "react-router-dom";

export function QuickActions() {
  const { openModal } = useJobModalStore();
  const navigate = useNavigate();
  return (
    <Card className="h-full border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="flex h-full flex-col gap-3">
        <Button
          className="w-full justify-start gap-3"
          onClick={()=>openModal()}
        >
          <PlusCircle className="h-5 w-5" />
          Post New Job
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          onClick={() => navigate("/recruiter/jobs")}
        >
          <BriefcaseBusiness className="h-5 w-5" />
          Manage Jobs
        </Button>

        <div className="mt-auto rounded-xl border border-dashed border-border/70 bg-muted/30 p-4">
          <p className="text-sm font-medium text-foreground">Keep your pipeline moving</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Review fresh applicants, shortlist quickly, and schedule interviews from one place.
          </p>
          <Button
            variant="link"
            className="mt-2 h-auto p-0 text-sm"
            onClick={() => navigate("/recruiter/applicants")}
          >
            Open applicants
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
