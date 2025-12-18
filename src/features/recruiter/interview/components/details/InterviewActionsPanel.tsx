import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import type{ InterviewDetails } from "../../types/interview-details.types";

export function InterviewActionsPanel({
  interview,
}: {
  interview: InterviewDetails;
}) {
  return (
    <Card className="sticky top-6">
      <CardContent className="p-4 space-y-2">
        <Button className="w-full">Mark Completed</Button>
        <Button variant="destructive" className="w-full">
          Cancel Interview
        </Button>
      </CardContent>
    </Card>
  );
}
