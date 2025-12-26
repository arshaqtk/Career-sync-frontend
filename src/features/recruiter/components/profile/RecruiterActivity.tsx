import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";

export function RecruiterActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-l pl-4 relative">
          <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />
          <p className="text-sm font-medium">Interview scheduled</p>
          <p className="text-xs text-muted-foreground">
            Frontend Developer · Today
          </p>
        </div>

        <div className="border-l pl-4 relative">
          <span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-green-500" />
          <p className="text-sm font-medium">Candidate hired</p>
          <p className="text-xs text-muted-foreground">
            Backend Developer · Yesterday
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
