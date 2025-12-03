import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CSButton from "../ui/cs-button";

export default function JobCard() {
  return (
    <Card className="p-5 shadow-sm">
      <CardContent className="space-y-3">
        <h2 className="text-lg font-semibold">Senior Frontend Developer</h2>
        <p className="text-gray-500 text-sm">TechCorp Inc.</p>

        <div className="flex gap-3 text-sm text-gray-500">
          <span>Remote</span>
          <span>$120k - $150k</span>
          <span>Posted 2 days ago</span>
        </div>

        <div className="flex gap-2">
          <Badge>React</Badge>
          <Badge>TypeScript</Badge>
          <Badge>Node.js</Badge>
        </div>

        <CSButton className="mt-3 w-fit">Apply Now</CSButton>
      </CardContent>
    </Card>
  );
}
