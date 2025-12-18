import { Badge } from "@/components/ui/shadcn/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";

<Card>
  <CardHeader>
    <div className="flex justify-between">
      <div>
        <h2 className="text-2xl font-semibold">Senior Frontend Developer</h2>
        <p className="text-muted-foreground">TechCorp Inc.</p>
      </div>
      <Badge>Interview Scheduled</Badge>
    </div>
  </CardHeader>

  <CardContent className="flex gap-6 text-sm text-muted-foreground">
    <span>Remote</span>
    <span>$120k - $150k</span>
    <span>Applied on Dec 20, 2024</span>
  </CardContent>
</Card>
