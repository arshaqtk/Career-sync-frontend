import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";

export default function InterviewCard() {
  return (
    <Card className="p-5 shadow-sm">
      <CardContent className="space-y-3">
        <h2 className="font-semibold">Senior Frontend Developer</h2>

        <div className="text-sm text-gray-600">
          <p>Date: Tomorrow</p>
          <p>Time: 2:00 PM</p>
          <p>Type: Technical Round</p>
        </div>

        <Button className="w-fit">Join Interview</Button>
      </CardContent>
    </Card>
  );
}
