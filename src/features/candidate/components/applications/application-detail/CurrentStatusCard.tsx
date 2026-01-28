import { Button } from "@/components/ui/shadcn/button";
import { Calendar } from "@/components/ui/shadcn/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";

export const CurrentStatusCard=()=>{
    
    return(
<Card>
  <CardHeader className="text-center">
    <Calendar className="mx-auto mb-2" />
    <CardTitle>Interview Scheduled</CardTitle>
    <p className="text-sm text-muted-foreground">
      Your technical interview is coming up soon
    </p>
  </CardHeader>

  <CardContent className="space-y-4">
    <div className="bg-muted text-center py-2 rounded">
      Dec 27, 2024 at 2:00 PM
    </div>
    <Button className="w-full">Join Interview</Button>
  </CardContent>
</Card>

    )
}
