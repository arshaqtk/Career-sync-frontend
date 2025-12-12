import { Card, CardContent, CardHeader } from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import { Mail, FileText } from "lucide-react";
import type { RecruiterApplicationDTO } from "../../types/application.dto";

interface ApplicantCard{
  applicant:RecruiterApplicationDTO,
  onView:()=>void

}

export function ApplicantCard({ applicant, onView }:ApplicantCard ) {
  return (
    <Card className="w-full shadow-sm rounded-xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{applicant.candidate.name}</h3>
          <p className="text-sm text-muted-foreground">
            {applicant.currentRole} • {applicant.experience} yrs
          </p>
        </div>

        <Badge variant="outline" className="text-xs">
          {applicant.status}
        </Badge>
      </CardHeader>

      <CardContent className="flex justify-between items-center">
        <div className="text-sm">
          <p className="flex items-center gap-2">
            <Mail size={14} /> {applicant.candidate.email}
          </p>
          <p className="text-xs text-muted-foreground">
            Applied: {applicant.createdAt}
          </p>
        </div>

        <div className="flex gap-2">
          <Button size="sm" onClick={onView}>
            View Profile
          </Button>

          <Button variant="outline" size="sm">
            <FileText size={14} /> Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
